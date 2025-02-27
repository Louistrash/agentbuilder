
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgentsList } from "@/components/admin/appointments/AgentsList";
import { Crown, Shield } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isSuperAdmin, isCEO, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
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
        description: "You do not have permission to access the admin dashboard.",
      });
      navigate('/');
    }

    setIsCheckingAdmin(false);
  }, [user, isAdmin, isAdminLoading, navigate, toast]);

  const handleViewChange = (value: string) => {
    setShowAgents(value === 'agents');
  };

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          {isCEO ? (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">CEO Dashboard</h1>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                CEO
              </Badge>
            </div>
          ) : isSuperAdmin ? (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                <Shield className="w-3 h-3 mr-1" />
                SUPER
              </Badge>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          )}
          <p className="text-gray-400">
            {isCEO ? "Complete platform management and controls" : 
             (isSuperAdmin ? "Advanced system management" : "Platform management")}
          </p>
        </div>
        
        {isCEO && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">View:</span>
            <Select onValueChange={handleViewChange} defaultValue="dashboard">
              <SelectTrigger className="w-[180px] bg-[#161B22] border-[#30363D]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-[#30363D]">
                <SelectItem value="dashboard">CEO Dashboard</SelectItem>
                <SelectItem value="agents">My Agents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {showAgents ? (
        <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Agent Manager</h2>
          <AgentsList />
        </div>
      ) : (
        <>
          <DashboardOverview analytics={analytics} chartData={chartData} />
          <AdminSections />
        </>
      )}
    </AdminLayout>
  );
};

export default Admin;
