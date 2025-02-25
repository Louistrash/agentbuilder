
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { GeneralSettings } from "@/components/admin/GeneralSettings";
import { ChatSection } from "@/components/admin/sections/ChatSection";
import { AppointmentsSection } from "@/components/admin/sections/AppointmentsSection";
import { AnalyticsSection } from "@/components/admin/sections/AnalyticsSection";
import { TrainingSection } from "@/components/admin/sections/TrainingSection";
import { IntegrationsSection } from "@/components/admin/sections/IntegrationsSection";
import { UsersSection } from "@/components/admin/sections/UsersSection";
import { SubscriptionsSection } from "@/components/admin/sections/SubscriptionsSection";
import { MarketplaceSection } from "@/components/admin/sections/MarketplaceSection";
import { TokensSection } from "@/components/admin/sections/TokensSection";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const { toast } = useToast();

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
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="max-w-[1400px] mx-auto p-4 space-y-4">
        <div className="rounded-lg overflow-hidden bg-[#222939] shadow-xl border border-[#1EAEDB]/10">
          <AdminHeader />

          <Tabs defaultValue="general" className="w-full">
            <div className="border-b border-[#1EAEDB]/10">
              <AdminTabs />
            </div>

            <div className="p-6">
              <TabsContent value="general" className="mt-0 space-y-4">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="chat" className="mt-0 space-y-4">
                <ChatSection />
              </TabsContent>

              <TabsContent value="appointments" className="mt-0 space-y-4">
                <AppointmentsSection />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0 space-y-4">
                <AnalyticsSection />
              </TabsContent>

              <TabsContent value="training" className="mt-0 space-y-4">
                <TrainingSection />
              </TabsContent>

              <TabsContent value="integrations" className="mt-0 space-y-4">
                <IntegrationsSection />
              </TabsContent>

              <TabsContent value="users" className="mt-0 space-y-4">
                <UsersSection />
              </TabsContent>

              <TabsContent value="subscriptions" className="mt-0 space-y-4">
                <SubscriptionsSection />
              </TabsContent>

              <TabsContent value="marketplace" className="mt-0 space-y-4">
                <MarketplaceSection />
              </TabsContent>

              <TabsContent value="tokens" className="mt-0 space-y-4">
                <TokensSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;

