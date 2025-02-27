
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading, userRole } = useAdmin();
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
        description: "You do not have permission to access the admin dashboard.",
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

  const isSuperAdmin = userRole === "admin";
  const isRegularAdmin = userRole === "moderator";

  // If user has neither role, show access denied (this should be caught in the useEffect above)
  if (!isSuperAdmin && !isRegularAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center p-8 bg-[#161B22] rounded-lg border border-red-500/30 max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">
            You do not have permission to access the admin dashboard.
          </p>
          <Button onClick={() => navigate('/')} variant="default">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Shield className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">
              {isSuperAdmin ? "Super Admin Dashboard" : "Admin Dashboard"}
            </h2>
            <p className="text-sm text-gray-400">
              {isSuperAdmin 
                ? "You have full access to all platform settings and data"
                : "You have limited administrative privileges"}
            </p>
          </div>
        </div>
      </div>

      <DashboardOverview analytics={analytics} chartData={chartData} />
      <AdminSections isSuperAdmin={isSuperAdmin} />
    </AdminLayout>
  );
};

export default Admin;
