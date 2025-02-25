
export interface TokenTransaction {
  id: string;
  profile_id: string;
  amount: number;
  description: string;
  created_at: string;
  transaction_type: 'credit' | 'debit';
  feature_used: string | null;
}

export interface TokenStats {
  totalGranted: number;
  totalSpent: number;
}
