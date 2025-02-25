
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MessageSquare, CreditCard } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState({
    totalUsers: 2048,
    newUsers: 429,
    activeChats: 143,
    revenue: 21560.57,
  });

  const [chartData] = useState([
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 400 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 350 },
    { name: 'Sun', value: 450 },
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (!profile?.is_admin) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You do not have permission to access the admin dashboard.",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not verify admin access. Please try again later.",
        });
        navigate('/');
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdmin();
  }, [user, navigate, toast]);

  if (isLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">CEO Dashboard</h1>
          <p className="text-gray-400">Welcome back, manage and monitor your platform</p>
        </div>

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
              <CardTitle className="text-sm font-medium text-gray-400">New Users</CardTitle>
              <MessageSquare className="h-4 w-4 text-[#1EAEDB]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{analytics.newUsers}</div>
              <div className="text-xs text-green-500">+5% from last week</div>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2F3E] border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-400">Active Chats</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#1EAEDB]" />
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#2A2F3E] border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#2A2F3E',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1EAEDB" 
                      strokeWidth={2}
                      dot={{ fill: '#1EAEDB' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#2A2F3E] border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#1A1F2C]">
                      <div className="w-2 h-2 rounded-full bg-[#1EAEDB]" />
                      <div>
                        <p className="text-sm text-white">New user registered</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
