
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageSquare, 
  Users, 
  Activity, 
  TrendingUp 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsSummary {
  totalChats: number;
  activeUsers: number;
  averageResponseTime: number;
  engagementRate: number;
}

export const AnalyticsOverview = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics-summary'],
    queryFn: async () => {
      // Get today's analytics
      const { data: todayAnalytics, error } = await supabase
        .from('chat_analytics')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }

      return {
        totalChats: todayAnalytics?.total_sessions || 0,
        activeUsers: todayAnalytics?.active_users || 0,
        averageResponseTime: todayAnalytics?.avg_response_time_ms 
          ? Math.round(todayAnalytics.avg_response_time_ms / 1000 * 10) / 10 
          : 0,
        engagementRate: todayAnalytics?.engagement_rate || 0
      };
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Chats",
      value: analytics?.totalChats.toLocaleString() || "0",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Active Users",
      value: analytics?.activeUsers.toLocaleString() || "0",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Avg. Response",
      value: `${analytics?.averageResponseTime}s` || "0s",
      icon: Activity,
      color: "text-yellow-500"
    },
    {
      title: "Engagement",
      value: `${Number(analytics?.engagementRate).toFixed(2)}%` || "0%",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mt-1 truncate">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} bg-gray-50 p-2 sm:p-3 rounded-full flex-shrink-0`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
