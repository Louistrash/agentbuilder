
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, CreditCard, CalendarDays } from "lucide-react";

interface MetricCardsProps {
  analytics: {
    totalUsers: number;
    activeChats: number;
    revenue: number;
    appointments: number;
  };
}

export function MetricCards({ analytics }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-[#161B22] border-[#30363D] hover:border-[#6366F1]/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-[#6366F1]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.totalUsers}</div>
          <div className="text-xs text-[#6366F1]">+12% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#161B22] border-[#30363D] hover:border-[#EC4899]/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Active Chats</CardTitle>
          <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-[#EC4899]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.activeChats}</div>
          <div className="text-xs text-[#EC4899]">+8% from yesterday</div>
        </CardContent>
      </Card>

      <Card className="bg-[#161B22] border-[#30363D] hover:border-[#10B981]/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
          <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-[#10B981]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${analytics.revenue.toLocaleString()}
          </div>
          <div className="text-xs text-[#10B981]">+15% from last month</div>
        </CardContent>
      </Card>

      <Card className="bg-[#161B22] border-[#30363D] hover:border-[#F59E0B]/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Appointments</CardTitle>
          <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-[#F59E0B]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.appointments}</div>
          <div className="text-xs text-[#F59E0B]">+5% from last week</div>
        </CardContent>
      </Card>
    </div>
  );
}
