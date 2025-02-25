
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { GeneralSettings } from "@/components/admin/GeneralSettings";
import { ChatSection } from "@/components/admin/sections/ChatSection";
import { UsersSection } from "@/components/admin/sections/UsersSection";
import { TokensSection } from "@/components/admin/sections/tokens/TokensSection";
import { AnalyticsSection } from "@/components/admin/sections/AnalyticsSection";
import { AppointmentsSection } from "@/components/admin/sections/AppointmentsSection";
import { MarketplaceSection } from "@/components/admin/sections/MarketplaceSection";
import { IntegrationsSection } from "@/components/admin/sections/IntegrationsSection";
import { SubscriptionsSection } from "@/components/admin/sections/SubscriptionsSection";
import { TrainingSection } from "@/components/admin/sections/TrainingSection";

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
      
      <div className="space-y-8">
        <section id="general" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
          <div className="border-b border-[#30363D] bg-[#0D1117]/50 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3">
              <Settings2 className="w-5 h-5 text-[#6366F1]" />
              General Settings
            </h2>
            <p className="text-sm text-gray-400 mt-1">Configure your system's general settings</p>
          </div>
          
          <div className="p-4 sm:p-6 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-transparent to-[#EC4899]/5"></div>
              <div className="relative z-10">
                <GeneralSettings />
              </div>
            </div>
          </div>
        </section>

        <section id="chat" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Chat Management</h2>
          <ChatSection />
        </section>

        <section id="users" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">User Management</h2>
          <UsersSection />
        </section>

        <section id="tokens" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Token Management</h2>
          <TokensSection />
        </section>

        <section id="analytics" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Analytics</h2>
          <AnalyticsSection />
        </section>

        <section id="appointments" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Appointments</h2>
          <AppointmentsSection />
        </section>

        <section id="marketplace" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Marketplace</h2>
          <MarketplaceSection />
        </section>

        <section id="integrations" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Integrations</h2>
          <IntegrationsSection />
        </section>

        <section id="subscriptions" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Subscriptions</h2>
          <SubscriptionsSection />
        </section>

        <section id="training" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
          <h2 className="text-xl font-semibold mb-6 text-white">Training</h2>
          <TrainingSection />
        </section>
      </div>
    </AdminLayout>
  );
};

export default Admin;
