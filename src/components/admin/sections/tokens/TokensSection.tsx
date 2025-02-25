
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TokenTransaction, TokenStats } from "./types";
import { TokenStatsCards } from "./TokenStatsCards";
import { GrantTokensForm } from "./GrantTokensForm";
import { TokenTransactionsTable } from "./TokenTransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TokensSection = () => {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedData = data?.map(transaction => ({
        ...transaction,
        transaction_type: transaction.transaction_type as 'credit' | 'debit'
      })) || [];
      
      setTransactions(typedData);
    } catch (error) {
      console.error('Error fetching token transactions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token transactions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const stats: TokenStats = transactions.reduce((acc, trans) => {
    if (trans.transaction_type === 'credit') {
      acc.totalGranted += trans.amount;
    } else {
      acc.totalSpent += trans.amount;
    }
    return acc;
  }, { totalGranted: 0, totalSpent: 0 });

  if (loading) {
    return <div className="p-4">Loading token data...</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <Card className="bg-[#222939]/95 border-[#1EAEDB]/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#1EAEDB] via-white to-[#1EAEDB]/70 bg-clip-text text-transparent">
            Token Management
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage and track token usage across the platform
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <TokenStatsCards stats={stats} />
          <GrantTokensForm onSuccess={fetchTransactions} />
          <TokenTransactionsTable transactions={transactions} />
        </CardContent>
      </Card>
    </div>
  );
};
