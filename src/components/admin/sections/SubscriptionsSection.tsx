
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Subscription {
  id: string;
  level: "basic" | "enhanced";
  messages_used: number;
  messages_limit: number;
  is_using_own_api: boolean;
  current_period_end: string;
  profiles: {
    full_name: string | null;
  };
}

export const SubscriptionsSection = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load subscriptions",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading subscriptions...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Subscription Management</h2>
        <p className="text-muted-foreground">Manage user subscriptions and usage</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Renewal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>{sub.profiles.full_name || 'Unknown User'}</TableCell>
              <TableCell>
                <Badge variant={sub.level === 'enhanced' ? 'default' : 'secondary'}>
                  {sub.level.charAt(0).toUpperCase() + sub.level.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {sub.messages_used} / {sub.messages_limit} messages
              </TableCell>
              <TableCell>
                {sub.is_using_own_api ? (
                  <Badge variant="outline">Own API Key</Badge>
                ) : (
                  <Badge>Platform API</Badge>
                )}
              </TableCell>
              <TableCell>
                {sub.current_period_end
                  ? `Renews ${formatDistanceToNow(new Date(sub.current_period_end))}`
                  : 'Not set'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
