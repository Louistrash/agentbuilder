
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface GrantTokensFormProps {
  onSuccess: () => void;
}

export const GrantTokensForm = ({ onSuccess }: GrantTokensFormProps) => {
  const [grantAmount, setGrantAmount] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { toast } = useToast();

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
      // First, update the user's token balance
      const { error: updateError } = await supabase.rpc('grant_tokens', { 
        user_id: selectedUserId, 
        amount: parseInt(grantAmount) 
      });

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

      // Reset form and notify parent
      setGrantAmount('');
      setSelectedUserId('');
      onSuccess();
    } catch (error) {
      console.error('Error granting tokens:', error);
      toast({
        title: "Error",
        description: "Failed to grant tokens",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grant Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Input
            placeholder="User ID"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full sm:max-w-[200px]"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={grantAmount}
            onChange={(e) => setGrantAmount(e.target.value)}
            className="w-full sm:max-w-[120px]"
          />
          <Button onClick={handleGrantTokens} className="w-full sm:w-auto">Grant Tokens</Button>
        </div>
      </CardContent>
    </Card>
  );
};
