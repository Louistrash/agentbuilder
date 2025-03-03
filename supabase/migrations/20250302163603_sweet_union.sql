-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  tokens integer DEFAULT 60,
  tokens_used integer DEFAULT 0,
  is_admin boolean DEFAULT false,
  sleep_preferences jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  -- Check and create policies only if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
      ON profiles FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON profiles FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' AND policyname = 'Service role can manage all profiles'
  ) THEN
    CREATE POLICY "Service role can manage all profiles"
      ON profiles
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Chat Sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id text NOT NULL,
  platform text,
  device_type text,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_sessions' AND policyname = 'Anyone can create chat sessions'
  ) THEN
    CREATE POLICY "Anyone can create chat sessions"
      ON chat_sessions FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_sessions' AND policyname = 'Users can view own chat sessions'
  ) THEN
    CREATE POLICY "Users can view own chat sessions"
      ON chat_sessions FOR SELECT
      TO authenticated
      USING (visitor_id = auth.uid()::text);
  END IF;
END $$;

-- Chat Messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid REFERENCES chat_sessions(id),
  message_type text NOT NULL,
  content text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  response_time_ms integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' AND policyname = 'Users can view messages from their sessions'
  ) THEN
    CREATE POLICY "Users can view messages from their sessions"
      ON chat_messages FOR SELECT
      TO authenticated
      USING (
        session_id IN (
          SELECT id FROM chat_sessions 
          WHERE visitor_id = auth.uid()::text
        )
      );
  END IF;
END $$;

-- Chat Analytics table
CREATE TABLE IF NOT EXISTS chat_analytics (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date date UNIQUE NOT NULL,
  total_sessions integer DEFAULT 0,
  total_messages integer DEFAULT 0,
  active_users integer DEFAULT 0,
  avg_response_time_ms float DEFAULT 0,
  avg_session_duration_sec float DEFAULT 0,
  engagement_rate float DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_analytics ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_analytics' AND policyname = 'Only admins can manage analytics'
  ) THEN
    CREATE POLICY "Only admins can manage analytics"
      ON chat_analytics
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid()
          AND is_admin = true
        )
      );
  END IF;
END $$;

-- Bot Settings table
CREATE TABLE IF NOT EXISTS bot_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_name text DEFAULT 'AI Assistant',
  logo_url text,
  welcome_message text DEFAULT 'Hello! How can I help you today?',
  chat_settings jsonb,
  number_of_quick_actions integer DEFAULT 4,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bot_settings ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bot_settings' AND policyname = 'Anyone can view bot settings'
  ) THEN
    CREATE POLICY "Anyone can view bot settings"
      ON bot_settings FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'bot_settings' AND policyname = 'Only admins can modify bot settings'
  ) THEN
    CREATE POLICY "Only admins can modify bot settings"
      ON bot_settings
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid()
          AND is_admin = true
        )
      );
  END IF;
END $$;

-- Quick Actions table
CREATE TABLE IF NOT EXISTS quick_actions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  text text NOT NULL,
  action text NOT NULL,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quick_actions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quick_actions' AND policyname = 'Anyone can view quick actions'
  ) THEN
    CREATE POLICY "Anyone can view quick actions"
      ON quick_actions FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'quick_actions' AND policyname = 'Only admins can modify quick actions'
  ) THEN
    CREATE POLICY "Only admins can modify quick actions"
      ON quick_actions
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid()
          AND is_admin = true
        )
      );
  END IF;
END $$;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_chat_sessions_updated_at'
  ) THEN
    CREATE TRIGGER update_chat_sessions_updated_at
        BEFORE UPDATE ON chat_sessions
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_chat_messages_updated_at'
  ) THEN
    CREATE TRIGGER update_chat_messages_updated_at
        BEFORE UPDATE ON chat_messages
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_chat_analytics_updated_at'
  ) THEN
    CREATE TRIGGER update_chat_analytics_updated_at
        BEFORE UPDATE ON chat_analytics
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_bot_settings_updated_at'
  ) THEN
    CREATE TRIGGER update_bot_settings_updated_at
        BEFORE UPDATE ON bot_settings
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_quick_actions_updated_at'
  ) THEN
    CREATE TRIGGER update_quick_actions_updated_at
        BEFORE UPDATE ON quick_actions
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;