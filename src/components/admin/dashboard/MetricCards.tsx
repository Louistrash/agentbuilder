
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
      <Card className="bg-admin-card border-admin-border hover:border-admin-accent-purple/50 transition-colors relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-admin-accent-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          <div className="w-10 h-10 rounded-xl bg-admin-accent-purple/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-admin-accent-purple" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-admin-accent-purple">+12% from last month</div>
        </CardContent>
      </Card>
      
      <Card className="bg-admin-card border-admin-border hover:border-admin-accent-pink/50 transition-colors relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-admin-accent-pink/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Active Chats</CardTitle>
          <div className="w-10 h-10 rounded-xl bg-admin-accent-pink/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-admin-accent-pink" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.activeChats.toLocaleString()}</div>
          <div className="text-xs text-admin-accent-pink">+8% from yesterday</div>
        </CardContent>
      </Card>

      <Card className="bg-admin-card border-admin-border hover:border-admin-accent-blue/50 transition-colors relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-admin-accent-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
          <div className="w-10 h-10 rounded-xl bg-admin-accent-blue/10 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-admin-accent-blue" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            ${analytics.revenue.toLocaleString()}
          </div>
          <div className="text-xs text-admin-accent-blue">+15% from last month</div>
        </CardContent>
      </Card>

      <Card className="bg-admin-card border-admin-border hover:border-admin-accent-purple/50 transition-colors relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-admin-accent-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Appointments</CardTitle>
          <div className="w-10 h-10 rounded-xl bg-admin-accent-purple/10 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-admin-accent-purple" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{analytics.appointments}</div>
          <div className="text-xs text-admin-accent-purple">+5% from last week</div>
        </CardContent>
      </Card>
    </div>
  );
}
