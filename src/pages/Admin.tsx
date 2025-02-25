
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
      <div className="min-h-screen bg-luxury-50 flex items-center justify-center">
        <p className="text-luxury-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <AdminHeader />

        <Tabs defaultValue="general" className="w-full">
          <AdminTabs />

          <div className="p-6">
            <TabsContent value="general" className="mt-0">
              <GeneralSettings />
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <ChatSection />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <AppointmentsSection />
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <AnalyticsSection />
            </TabsContent>

            <TabsContent value="training" className="mt-0">
              <TrainingSection />
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <IntegrationsSection />
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <UsersSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
