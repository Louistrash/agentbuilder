
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowUp, ArrowDown } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { TokenTransaction } from "@/components/admin/sections/tokens/types";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Card className={`bg-[#161B22] border-[#30363D] ${isPopup ? 'shadow-xl' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="w-5 h-5 text-[#1EAEDB]" />
          Your Tokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="text-xl font-bold text-white">{tokens} tokens</p>
            </div>
            <Button 
              onClick={() => window.location.href = '/admin?tab=marketplace'}
              className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-sm"
              size="sm"
            >
              Buy More
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-medium text-gray-400">Recent Transactions</h3>
            <ScrollArea className="h-[120px]">
              <div className="space-y-1.5">
                {loading ? (
                  <p className="text-xs text-gray-400">Loading transactions...</p>
                ) : transactions.length === 0 ? (
                  <p className="text-xs text-gray-400">No transactions yet</p>
                ) : (
                  transactions.map(transaction => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-1.5 rounded-lg bg-[#1C2128] border border-[#30363D]"
                    >
                      <div className="flex items-center gap-2">
                        {transaction.transaction_type === 'credit' ? (
                          <ArrowUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-500" />
                        )}
                        <div>
                          <p className="text-xs font-medium text-white">
                            {transaction.description}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className={`text-xs font-medium ${
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
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
