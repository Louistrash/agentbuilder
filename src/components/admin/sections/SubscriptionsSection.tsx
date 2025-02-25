
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
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import { Ban, RefreshCw, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Subscription {
  id: string;
  level: "basic" | "enhanced";
  messages_used: number;
  messages_limit: number;
  is_using_own_api: boolean;
  current_period_end: string;
  current_period_start: string;
  stripe_subscription_id: string | null;
  profiles: {
    full_name: string | null;
  };
}

export const SubscriptionsSection = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    basicPlans: 0,
    enhancedPlans: 0,
  });
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
      
      // Calculate statistics
      const now = new Date();
      const activeSubscriptions = data?.filter(sub => 
        sub.current_period_end && new Date(sub.current_period_end) > now
      ) || [];

      setStats({
        total: data?.length || 0,
        active: activeSubscriptions.length,
        basicPlans: data?.filter(sub => sub.level === 'basic').length || 0,
        enhancedPlans: data?.filter(sub => sub.level === 'enhanced').length || 0,
      });
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

  const handleCancelSubscription = async (stripeSubscriptionId: string) => {
    if (!stripeSubscriptionId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No Stripe subscription ID found",
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          action: 'cancel-subscription',
          subscriptionId: stripeSubscriptionId,
        }),
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');

      toast({
        title: "Success",
        description: "Subscription cancelled successfully",
      });
      
      fetchSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to cancel subscription",
      });
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Basic Plans</CardTitle>
            <Badge variant="secondary">{stats.basicPlans}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.basicPlans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enhanced Plans</CardTitle>
            <Badge>{stats.enhancedPlans}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enhancedPlans}</div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Renewal</TableHead>
            <TableHead>Actions</TableHead>
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
                <div className="flex flex-col">
                  <span className="font-medium">{sub.messages_used} / {sub.messages_limit}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((sub.messages_used / sub.messages_limit) * 100)}% used
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {sub.is_using_own_api ? (
                  <Badge variant="outline">Own API Key</Badge>
                ) : (
                  <Badge>Platform API</Badge>
                )}
              </TableCell>
              <TableCell>
                {sub.current_period_start && (
                  <span className="text-sm">
                    {format(new Date(sub.current_period_start), 'MMM d')} - {format(new Date(sub.current_period_end), 'MMM d, yyyy')}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {sub.current_period_end && (
                  <span className="text-sm">
                    in {formatDistanceToNow(new Date(sub.current_period_end))}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {sub.stripe_subscription_id && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelSubscription(sub.stripe_subscription_id!)}
                  >
                    <Ban className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
