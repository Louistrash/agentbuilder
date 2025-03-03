import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const ProAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isProAdmin, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const { toast } = useToast();
  
  const [analytics, setAnalytics] = useState({
    totalUsers: 248,
    newUsers: 29,
    activeChats: 43,
    revenue: 1560.57,
    appointments: 8,
    marketplaceItems: 5,
    integrations: 3,
    trainingDocs: 26,
  });

  const [chartData] = useState([
    { name: 'Mon', value: 40 },
    { name: 'Tue', value: 30 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 40 },
    { name: 'Fri', value: 50 },
    { name: 'Sat', value: 35 },
    { name: 'Sun', value: 45 },
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!isAdminLoading && !isProAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to access the pro admin dashboard.",
      });
      navigate('/');
    }

    setIsCheckingAdmin(false);
  }, [user, isProAdmin, isAdminLoading, navigate, toast]);

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
          <h1 className="text-2xl font-bold text-white">Pro Admin Dashboard</h1>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            PRO
          </Badge>
        </div>
        <p className="text-gray-400">
          Enhanced management features and analytics
        </p>
      </div>

      <DashboardOverview analytics={analytics} chartData={chartData} />
      <AdminSections />
    </AdminLayout>
  );
};

export default ProAdmin;