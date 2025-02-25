
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
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] bg-opacity-95 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09PT8/Pz///8nZzVxAAAABXRSTlMACAwQEBvb/XgAAACSSURBVDjLvZA7EgMhCEQpvP+di2z2Atvb2mAJPyYZR8qnePCYklrrWuu1VO9jDvFBGJuGhPB7Zxxm4YSQgXnGjBwxA2cEjtkxg2f0gNkzR8HuWRR8niUFp2dZAZcR28ClxB3ALcU9wDXGQ8CtxlMA1xzPAVx7vAhwL/EyAPcWrwNwrwECcO9RBODeBATg3qMYgPsPYwDsNP4AZLrVs0E+tWEAAAAASUVORK5CYII=')] bg-repeat">
      <div className="max-w-[1400px] mx-auto p-4 space-y-4">
        <div className="rounded-xl overflow-hidden bg-[#222939]/95 shadow-2xl border border-[#1EAEDB]/10 backdrop-blur-sm transition-all duration-300">
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

              <TabsContent value="users" className="mt-0 space-y-4">
                <UsersSection />
              </TabsContent>

              <TabsContent value="tokens" className="mt-0 space-y-4">
                <TokensSection />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0 space-y-4">
                <AnalyticsSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Admin;
