
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

const MOCK_DATA = [
  { date: "Mon", chats: 120, responses: 115 },
  { date: "Tue", chats: 145, responses: 140 },
  { date: "Wed", chats: 132, responses: 130 },
  { date: "Thu", chats: 167, responses: 160 },
  { date: "Fri", chats: 159, responses: 155 },
  { date: "Sat", chats: 95, responses: 90 },
  { date: "Sun", chats: 88, responses: 85 }
];

export const ChatMetricsChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Chat Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={MOCK_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="chats" fill="#3b82f6" name="Total Chats" />
            <Bar dataKey="responses" fill="#10b981" name="Bot Responses" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
