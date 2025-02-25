
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
      <Card className="bg-[#2A2F3E] border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          <Users className="h-4 w-4 text-[#1EAEDB]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.totalUsers}</div>
          <div className="text-xs text-green-500">+12% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#2A2F3E] border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Active Chats</CardTitle>
          <MessageSquare className="h-4 w-4 text-[#1EAEDB]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.activeChats}</div>
          <div className="text-xs text-green-500">+8% from yesterday</div>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2F3E] border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-[#1EAEDB]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${analytics.revenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-500">+15% from last month</div>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2F3E] border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Appointments</CardTitle>
          <CalendarDays className="h-4 w-4 text-[#1EAEDB]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.appointments}</div>
          <div className="text-xs text-green-500">+5% from last week</div>
        </CardContent>
      </Card>
    </div>
  );
}
