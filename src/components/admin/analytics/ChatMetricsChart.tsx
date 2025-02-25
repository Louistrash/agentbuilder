
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";

export const ChatMetricsChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['weekly-chat-metrics'],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = subDays(endDate, 6); // Last 7 days

      const { data, error } = await supabase
        .from('chat_analytics')
        .select('date, total_sessions, total_messages')
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching chat metrics:', error);
        throw error;
      }

      return data.map(day => ({
        date: format(new Date(day.date), 'EEE'),
        chats: day.total_sessions,
        messages: day.total_messages
      }));
    }
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Chat Activity</h3>
        <div className="h-[180px] sm:h-[300px] animate-pulse bg-gray-100 rounded" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Chat Activity</h3>
      <div className="h-[180px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="chats" fill="#3b82f6" name="Total Chats" />
            <Bar dataKey="messages" fill="#10b981" name="Total Messages" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
