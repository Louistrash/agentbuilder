/*
  # Training System Schema

  1. New Tables
    - `training_files`
      - Uploaded training documents
    - `website_training_sources`
      - Website content for training
    - `organization_usage`
      - Training data usage tracking

  2. Security
    - Enable RLS
    - Add policies for training data access
    
  3. Changes
    - Initial training system setup
*/

-- Training Files table
CREATE TABLE IF NOT EXISTS training_files (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  filename text NOT NULL,
  file_path text NOT NULL,
  content_type text NOT NULL,
  size integer NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE training_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their training files"
  ON training_files FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can upload training files"
  ON training_files FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Website Training Sources table
CREATE TABLE IF NOT EXISTS website_training_sources (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  url text NOT NULL,
  status text DEFAULT 'pending',
  processed boolean DEFAULT false,
  word_count integer DEFAULT 0,
  storage_size integer DEFAULT 0,
  error_message text,
  retention_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE website_training_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their website sources"
  ON website_training_sources FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can add website sources"
  ON website_training_sources FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Organization Usage table
CREATE TABLE IF NOT EXISTS organization_usage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  total_words_used integer DEFAULT 0,
  words_limit integer DEFAULT 100000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organization_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their usage"
  ON organization_usage FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Update triggers
CREATE TRIGGER update_website_training_sources_updated_at
    BEFORE UPDATE ON website_training_sources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_usage_updated_at
    BEFORE UPDATE ON organization_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to handle data retention
CREATE OR REPLACE FUNCTION handle_data_retention()
RETURNS void AS $$
BEGIN
  -- Delete expired website training data
  DELETE FROM website_training_sources
  WHERE retention_expires_at < now();
  
  -- Archive old chat messages
  UPDATE chat_messages
  SET content = '[Archived]'
  WHERE created_at < now() - interval '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;