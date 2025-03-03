import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentsList } from "@/components/admin/appointments/AgentsList";
import { 
  Sparkles, 
  Users, 
  LineChart, 
  CalendarDays, 
  ShoppingBag,
  Settings,
  Key,
  UserCog
} from "lucide-react";

const ProAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const { toast } = useToast();
  
  const [analytics, setAnalytics] = useState({
    totalUsers: 2048,
    newUsers: 429,
    activeChats: 143,
    revenue: 21560.57,
    appointments: 28,
    marketplaceItems: 15,
    integrations: 7,
    trainingDocs: 156,
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
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!isAdminLoading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to access the pro admin dashboard.",
      });
      navigate('/');
    }

    setIsCheckingAdmin(false);
  }, [user, isAdmin, isAdminLoading, navigate, toast]);

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <AdminLayout>
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">PRO Admin Dashboard</h1>
                <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  PRO
                </Badge>
              </div>
              <p className="text-gray-400">
                Advanced management console for pro users
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-[#161B22] border-[#30363D]">
                <Key className="w-3 h-3 mr-1" />
                <span className="text-gray-400">API:</span> <span className="text-white ml-1">Active</span>
              </Badge>

              <Badge variant="outline" className="bg-[#161B22] border-[#30363D]">
                <Settings className="w-3 h-3 mr-1" />
                <span className="text-gray-400">Last sync:</span> <span className="text-white ml-1">5 min ago</span>
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-[#161B22] border border-[#30363D] p-1">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#0D1117] data-[state=active]:text-white">
              <LineChart className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#0D1117] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-[#0D1117] data-[state=active]:text-white">
              <UserCog className="w-4 h-4 mr-2" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-[#0D1117] data-[state=active]:text-white">
              <CalendarDays className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-[#0D1117] data-[state=active]:text-white">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Marketplace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview analytics={analytics} chartData={chartData} />
          </TabsContent>

          <TabsContent value="users">
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Users Management</h2>
              <p className="text-gray-400 mb-6">
                Advanced user management features for PRO accounts are available here.
              </p>
              <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
                <p className="text-center text-gray-400">PRO User Management Component</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Agent Manager</h2>
              <AgentsList />
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Appointment Management</h2>
              <p className="text-gray-400 mb-6">
                Schedule and manage appointments with advanced PRO features.
              </p>
              <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
                <p className="text-center text-gray-400">PRO Appointment Management Component</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="marketplace">
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
              <h2 className="text-xl font-semibold text-white mb-4">PRO Marketplace</h2>
              <p className="text-gray-400 mb-6">
                Exclusive PRO marketplace features and add-ons.
              </p>
              <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
                <p className="text-center text-gray-400">PRO Marketplace Component</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Advanced Administration</h2>
          <AdminSections />
        </div>
      </AdminLayout>
    </>
  );
};

export default ProAdminDashboard;