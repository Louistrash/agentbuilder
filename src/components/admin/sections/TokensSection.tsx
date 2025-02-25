
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Coins, TrendingUp, TrendingDown } from "lucide-react";

interface TokenTransaction {
  id: string;
  profile_id: string;
  amount: number;
  description: string;
  created_at: string;
  transaction_type: 'credit' | 'debit';
  feature_used: string | null;
}

export const TokensSection = () => {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantAmount, setGrantAmount] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { toast } = useToast();

  // Fetch token transactions
  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Cast the transaction_type to the correct type
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

  // Grant tokens to a user
  const handleGrantTokens = async () => {
    if (!selectedUserId || !grantAmount || isNaN(Number(grantAmount))) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid user ID and token amount",
        variant: "destructive",
      });
      return;
    }

    try {
      // First, update the user's token balance using a direct update
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tokens: supabase.rpc('grant_tokens', { 
          user_id: selectedUserId, 
          amount: parseInt(grantAmount) 
        })})
        .eq('id', selectedUserId);

      if (updateError) throw updateError;

      // Record the transaction
      const { error: transactionError } = await supabase
        .from('token_transactions')
        .insert({
          profile_id: selectedUserId,
          amount: parseInt(grantAmount),
          description: 'Admin granted tokens',
          transaction_type: 'credit'
        });

      if (transactionError) throw transactionError;

      toast({
        title: "Success",
        description: `Granted ${grantAmount} tokens to user`,
      });

      // Reset form and refresh data
      setGrantAmount('');
      setSelectedUserId('');
      fetchTransactions();
    } catch (error) {
      console.error('Error granting tokens:', error);
      toast({
        title: "Error",
        description: "Failed to grant tokens",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate statistics
  const stats = transactions.reduce((acc, trans) => {
    if (trans.transaction_type === 'credit') {
      acc.totalGranted += trans.amount;
    } else {
      acc.totalSpent += trans.amount;
    }
    return acc;
  }, { totalGranted: 0, totalSpent: 0 });

  if (loading) {
    return <div>Loading token data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Token Management</h2>
        <p className="text-muted-foreground">Manage and track token usage across the platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Granted</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGranted}</div>
            <p className="text-xs text-muted-foreground">
              Platform-wide token allocation
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">
              Tokens used for features
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Tokens</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGranted - stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">
              Currently active tokens
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grant Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="User ID"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="max-w-[200px]"
            />
            <Input
              type="number"
              placeholder="Amount"
              value={grantAmount}
              onChange={(e) => setGrantAmount(e.target.value)}
              className="max-w-[120px]"
            />
            <Button onClick={handleGrantTokens}>Grant Tokens</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Feature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {transaction.profile_id}
                  </TableCell>
                  <TableCell>
                    <span className={
                      transaction.transaction_type === 'credit' 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }>
                      {transaction.transaction_type}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.feature_used || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
