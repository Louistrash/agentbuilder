/*
  # Subscription System Schema

  1. New Tables
    - `subscription_tiers`
      - Available subscription plans
    - `subscriptions`
      - User subscriptions
    - `subscription_invoices`
      - Billing history

  2. Security
    - Enable RLS
    - Add policies for subscription management
    
  3. Changes
    - Initial subscription system setup
*/

-- Create subscription level enum
CREATE TYPE subscription_level AS ENUM ('basic', 'enhanced');

-- Create tier type enum
CREATE TYPE tier_type AS ENUM ('free', 'pro', 'enterprise');

-- Subscription Tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name tier_type NOT NULL,
  price numeric NOT NULL,
  words_limit integer NOT NULL,
  pages_limit integer NOT NULL,
  storage_days integer NOT NULL,
  features jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subscription tiers"
  ON subscription_tiers FOR SELECT
  TO authenticated
  USING (true);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  tier_id uuid REFERENCES subscription_tiers(id),
  level subscription_level NOT NULL,
  stripe_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  messages_used integer DEFAULT 0,
  messages_limit integer,
  is_using_own_api boolean DEFAULT false,
  openai_api_key text,
  storage_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Subscription Invoices table
CREATE TABLE IF NOT EXISTS subscription_invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id uuid REFERENCES subscriptions(id),
  stripe_invoice_id text,
  amount_due numeric NOT NULL,
  messages_count integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscription_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their invoices"
  ON subscription_invoices FOR SELECT
  TO authenticated
  USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE profile_id = auth.uid()
    )
  );

-- Update triggers
CREATE TRIGGER update_subscription_tiers_updated_at
    BEFORE UPDATE ON subscription_tiers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscription_invoices_updated_at
    BEFORE UPDATE ON subscription_invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();