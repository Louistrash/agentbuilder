/*
  # Marketplace Schema

  1. New Tables
    - `marketplace_features`
      - Available features for purchase
    - `purchased_features`
      - User purchased features
    - `marketplace_transactions`
      - Transaction history

  2. Security
    - Enable RLS
    - Add policies for marketplace access
    
  3. Changes
    - Initial marketplace schema creation
*/

-- Marketplace Features table
CREATE TABLE IF NOT EXISTS marketplace_features (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active marketplace features"
  ON marketplace_features FOR SELECT
  TO authenticated
  USING (status = 'active');

-- Purchased Features table
CREATE TABLE IF NOT EXISTS purchased_features (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  feature_id uuid NOT NULL REFERENCES marketplace_features(id),
  status text DEFAULT 'active',
  purchased_at timestamptz DEFAULT now(),
  activated_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchased_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their purchased features"
  ON purchased_features FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Marketplace Transactions table
CREATE TABLE IF NOT EXISTS marketplace_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text DEFAULT 'pending',
  stripe_session_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their transactions"
  ON marketplace_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Update triggers
CREATE TRIGGER update_marketplace_features_updated_at
    BEFORE UPDATE ON marketplace_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_purchased_features_updated_at
    BEFORE UPDATE ON purchased_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketplace_transactions_updated_at
    BEFORE UPDATE ON marketplace_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();