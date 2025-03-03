/*
  # Addons Marketplace Schema

  1. New Tables
    - `marketplace_addons`
      - Available addons for purchase
    - `purchased_addons`
      - User purchased addons
    - Adds addon_category enum

  2. Security
    - Enable RLS
    - Add policies for addon management
    
  3. Changes
    - Initial addons marketplace setup
*/

-- Create addon category enum
CREATE TYPE addon_category AS ENUM (
  'automation',
  'communication',
  'customization',
  'analytics',
  'integration'
);

-- Marketplace Addons table
CREATE TABLE IF NOT EXISTS marketplace_addons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  category addon_category NOT NULL,
  price integer NOT NULL,
  features jsonb NOT NULL,
  icon_name text NOT NULL,
  is_premium boolean DEFAULT false,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active addons"
  ON marketplace_addons FOR SELECT
  TO authenticated
  USING (status = 'active');

-- Purchased Addons table
CREATE TABLE IF NOT EXISTS purchased_addons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  addon_id uuid REFERENCES marketplace_addons(id),
  agent_id uuid REFERENCES agents(id),
  status text DEFAULT 'active',
  settings jsonb,
  purchased_at timestamptz DEFAULT now(),
  activated_at timestamptz,
  expires_at timestamptz
);

ALTER TABLE purchased_addons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their purchased addons"
  ON purchased_addons FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Update triggers
CREATE TRIGGER update_marketplace_addons_updated_at
    BEFORE UPDATE ON marketplace_addons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial addons
INSERT INTO marketplace_addons (name, description, category, price, features, icon_name, is_premium)
VALUES
  (
    'Advanced Analytics',
    'Get detailed insights into your chat interactions',
    'analytics',
    25,
    '["User sentiment analysis", "Conversation flow tracking", "Response time metrics", "Custom reports"]',
    'BarChart3',
    true
  ),
  (
    'Multi-Channel Support',
    'Connect with users across different platforms',
    'communication',
    30,
    '["WhatsApp integration", "Facebook Messenger", "Telegram support", "Email notifications"]',
    'MessageSquare',
    true
  ),
  (
    'Custom Training',
    'Train your agent with custom data sources',
    'customization',
    40,
    '["Document upload", "Website crawling", "API integration", "Custom knowledge base"]',
    'Brain',
    true
  );