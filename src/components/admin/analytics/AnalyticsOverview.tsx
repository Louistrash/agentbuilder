
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart, 
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

const MOCK_DATA: AnalyticsSummary = {
  totalChats: 1567,
  activeUsers: 342,
  averageResponseTime: 2.5,
  engagementRate: 78
};

export const AnalyticsOverview = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics-summary'],
    queryFn: async () => {
      // In a real implementation, this would fetch actual data from Supabase
      // For now, we'll use mock data
      return MOCK_DATA;
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      title: "Avg. Response Time",
      value: `${analytics?.averageResponseTime}s` || "0s",
      icon: Activity,
      color: "text-yellow-500"
    },
    {
      title: "Engagement Rate",
      value: `${analytics?.engagementRate}%` || "0%",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} bg-gray-50 p-3 rounded-full`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
