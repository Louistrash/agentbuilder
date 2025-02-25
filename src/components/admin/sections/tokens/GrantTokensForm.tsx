
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GrantTokensFormProps {
  onSuccess: () => void;
}

export const GrantTokensForm = ({ onSuccess }: GrantTokensFormProps) => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('token_transactions')
        .insert({
          profile_id: userId,
          amount: Number(amount),
          transaction_type: 'credit',
          description: 'Manual token grant by admin'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Granted ${amount} tokens to user ${userId}`,
      });

      setUserId("");
      setAmount("");
      onSuccess();
    } catch (error) {
      console.error('Error granting tokens:', error);
      toast({
        title: "Error",
        description: "Failed to grant tokens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#222939]/95 border-[#1EAEDB]/10 shadow-lg">
      <CardHeader>
        <CardTitle>Grant Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="userId" className="text-sm font-medium">
                User ID
              </label>
              <Input
                id="userId"
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter token amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
          >
            {loading ? "Granting..." : "Grant Tokens"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
