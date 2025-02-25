
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";

const Admin = () => {
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

  return (
    <AdminLayout>
      <DashboardOverview analytics={analytics} chartData={chartData} />
      <AdminSections />
    </AdminLayout>
  );
};

export default Admin;
