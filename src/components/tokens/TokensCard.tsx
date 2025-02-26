
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { TokenTransaction } from "@/components/admin/sections/tokens/types";

interface TokensCardProps {
  isPopup?: boolean;
}

export function TokensCard({ isPopup = false }: TokensCardProps) {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<number>(0);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTokens();
      fetchTransactions();
    }
  }, [user]);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setTokens(data?.tokens || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      
      const typedTransactions: TokenTransaction[] = (data || []).map(transaction => ({
        ...transaction,
        transaction_type: transaction.transaction_type as 'credit' | 'debit'
      }));
      
      setTransactions(typedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#0D1117] p-6 rounded-lg space-y-6">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-[#1EAEDB]" />
        <h2 className="text-lg font-semibold text-white">Your Tokens</h2>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-400">Available Balance</p>
        <p className="text-2xl font-bold text-white">{tokens} tokens</p>
      </div>

      <Button
        onClick={() => window.location.href = '/admin?tab=marketplace'}
        className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white"
      >
        Buy More
      </Button>

      <div className="space-y-2">
        <h3 className="text-sm text-gray-400">Recent Transactions</h3>
        <div className="space-y-1">
          {loading ? (
            <p className="text-sm text-gray-500">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-sm text-gray-500">No transactions yet</p>
          ) : (
            transactions.map(transaction => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between py-1"
              >
                <p className="text-sm text-gray-300">{transaction.description}</p>
                <p className={`text-sm font-medium ${
                  transaction.transaction_type === 'credit' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {transaction.transaction_type === 'credit' ? '+' : '-'}
                  {transaction.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
