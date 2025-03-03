import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSuperAdmin, isLoading: isAdminLoading } = useAdmin();
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

    if (!isAdminLoading && !isSuperAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to access the super admin dashboard.",
      });
      navigate('/');
    }

    setIsCheckingAdmin(false);
  }, [user, isSuperAdmin, isAdminLoading, navigate, toast]);

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            SUPER
          </Badge>
        </div>
        <p className="text-gray-400">
          Complete platform management and controls
        </p>
      </div>

      <DashboardOverview analytics={analytics} chartData={chartData} />
      <AdminSections />
    </AdminLayout>
  );
};

export default SuperAdmin;