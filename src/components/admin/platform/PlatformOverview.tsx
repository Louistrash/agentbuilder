
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Server, 
  Shield, 
  Activity,
  HeadsetIcon
} from "lucide-react";
import { format, subDays } from "date-fns";

// Helper function to calculate growth percentage
const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous * 100).toFixed(1);
};

export const PlatformOverview = () => {
  // Fetch users metrics
  const { data: userMetrics } = useQuery({
    queryKey: ['platform-users'],
    queryFn: async () => {
      const today = new Date();
      const lastWeek = subDays(today, 7);

      // Get current users count
      const { count: currentUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get last week's users count
      const { count: lastWeekUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', lastWeek.toISOString());

      return {
        total: currentUsers || 0,
        growth: calculateGrowth(currentUsers || 0, lastWeekUsers || 0)
      };
    }
  });

  // Fetch revenue metrics
  const { data: revenueMetrics } = useQuery({
    queryKey: ['platform-revenue'],
    queryFn: async () => {
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('level');

      const basicCount = subscriptions?.filter(s => s.level === 'basic').length || 0;
      const enhancedCount = subscriptions?.filter(s => s.level === 'enhanced').length || 0;

      // Assuming basic plan is $10 and enhanced is $25 per month
      const monthlyRevenue = (basicCount * 10) + (enhancedCount * 25);

      return {
        monthlyRevenue,
        activeSubscriptions: subscriptions?.length || 0
      };
    }
  });

  // Fetch system health metrics
  const { data: systemHealth } = useQuery({
    queryKey: ['system-health'],
    queryFn: async () => {
      const { data: analytics } = await supabase
        .from('chat_analytics')
        .select('avg_response_time_ms')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      return {
        avgResponseTime: analytics?.avg_response_time_ms 
          ? (analytics.avg_response_time_ms / 1000).toFixed(2)
          : 0,
        systemStatus: 'Operational', // This would normally come from a monitoring service
        uptime: '99.9%' // This would normally come from a monitoring service
      };
    }
  });

  // Fetch active chat agents
  const { data: chatAgents } = useQuery({
    queryKey: ['active-agents'],
    queryFn: async () => {
      const { data: agents } = await supabase
        .from('chat_agents')
        .select('*')
        .eq('is_active', true);

      return {
        totalActive: agents?.length || 0,
        activeAgents: agents || []
      };
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
        <p className="text-muted-foreground">Real-time metrics and system status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users & Growth */}
        <Card className="bg-[#1A1F2C] border-[#30363D] hover:bg-[#222939] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userMetrics?.total || 0}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-4 w-4 mr-1 text-[#10B981]" />
              <span className="text-[#10B981]">{userMetrics?.growth}% growth</span>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Metrics */}
        <Card className="bg-[#1A1F2C] border-[#30363D] hover:bg-[#222939] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-[#EC4899]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${revenueMetrics?.monthlyRevenue || 0}
            </div>
            <p className="text-xs text-gray-400">
              {revenueMetrics?.activeSubscriptions || 0} active subscriptions
            </p>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-[#1A1F2C] border-[#30363D] hover:bg-[#222939] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">System Health</CardTitle>
            <Server className="h-4 w-4 text-[#3B82F6]" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-[#10B981]" />
              <span className="text-[#10B981]">{systemHealth?.systemStatus}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="text-xs">
                <span className="text-gray-400">Response:</span>
                <br />
                <span className="text-white">{systemHealth?.avgResponseTime}s</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-400">Uptime:</span>
                <br />
                <span className="text-white">{systemHealth?.uptime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Chat Agents */}
        <Card className="bg-[#1A1F2C] border-[#30363D] hover:bg-[#222939] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Agents</CardTitle>
            <HeadsetIcon className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{chatAgents?.totalActive || 0}</div>
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-1 text-[#3B82F6]" />
              <span className="text-xs text-gray-400">
                All systems operational
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
