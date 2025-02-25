
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { MetricCards } from "@/components/admin/dashboard/MetricCards";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { QuickStats } from "@/components/admin/dashboard/QuickStats";
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
  const { user, isLoading } = useAuth();
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
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#161B22] border-r border-[#30363D]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {/* Add navigation items here */}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-400">Complete system management and analytics</p>
            </div>

            <MetricCards analytics={analytics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RevenueChart data={chartData} />
              <QuickStats 
                stats={{
                  marketplaceItems: analytics.marketplaceItems,
                  integrations: analytics.integrations,
                  trainingDocs: analytics.trainingDocs,
                }}
              />
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <div className="bg-[#161B22] rounded-lg p-4 backdrop-blur-sm border border-[#30363D]">
                <AdminTabs />
              </div>
              
              <div className="bg-[#161B22] rounded-lg p-6 border border-[#30363D]">
                <TabsContent value="general" className="mt-0">
                  <GeneralSettings />
                </TabsContent>

                <TabsContent value="chat" className="mt-0">
                  <ChatSection />
                </TabsContent>

                <TabsContent value="users" className="mt-0">
                  <UsersSection />
                </TabsContent>

                <TabsContent value="tokens" className="mt-0">
                  <TokensSection />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <AnalyticsSection />
                </TabsContent>

                <TabsContent value="appointments" className="mt-0">
                  <AppointmentsSection />
                </TabsContent>

                <TabsContent value="marketplace" className="mt-0">
                  <MarketplaceSection />
                </TabsContent>

                <TabsContent value="integrations" className="mt-0">
                  <IntegrationsSection />
                </TabsContent>

                <TabsContent value="subscriptions" className="mt-0">
                  <SubscriptionsSection />
                </TabsContent>

                <TabsContent value="training" className="mt-0">
                  <TrainingSection />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
