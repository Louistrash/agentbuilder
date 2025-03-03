/*
  # Token System Schema

  1. New Tables
    - `token_transactions`
      - Records token transactions
    - Functions for token management

  2. Security
    - Enable RLS
    - Add policies for token transactions
    
  3. Changes
    - Initial token system setup
*/

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

CREATE POLICY "Users can view their token transactions"
  ON token_transactions FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

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