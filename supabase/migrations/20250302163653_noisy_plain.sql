-- Token Transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid NOT NULL REFERENCES profiles(id),
  amount integer NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
  description text NOT NULL,
  feature_used text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;

-- Check and create policies only if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'token_transactions' AND policyname = 'Users can view their token transactions'
  ) THEN
    CREATE POLICY "Users can view their token transactions"
      ON token_transactions FOR SELECT
      TO authenticated
      USING (profile_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'token_transactions' AND policyname = 'Users can insert token transactions'
  ) THEN
    CREATE POLICY "Users can insert token transactions"
      ON token_transactions FOR INSERT
      TO authenticated
      WITH CHECK (profile_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'token_transactions' AND policyname = 'Service role can manage token transactions'
  ) THEN
    CREATE POLICY "Service role can manage token transactions"
      ON token_transactions
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Function to grant tokens to a user
CREATE OR REPLACE FUNCTION grant_tokens(user_id uuid, amount integer)
RETURNS void AS $$
BEGIN
  -- Update user's token balance
  UPDATE profiles
  SET tokens = COALESCE(tokens, 0) + amount
  WHERE id = user_id;

  -- Record the transaction
  INSERT INTO token_transactions (
    profile_id,
    amount,
    transaction_type,
    description
  ) VALUES (
    user_id,
    amount,
    'credit',
    'Token grant'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create activity_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  details jsonb,
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity(
  action text,
  resource_type text,
  resource_id text DEFAULT NULL,
  details jsonb DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO activity_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    details,
    ip_address
  ) VALUES (
    auth.uid(),
    action,
    resource_type,
    resource_id,
    details,
    inet_client_addr()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS to activity_logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Add policies for activity_logs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'activity_logs' AND policyname = 'Admins can view activity logs'
  ) THEN
    CREATE POLICY "Admins can view activity logs"
      ON activity_logs FOR SELECT
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