import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { GeneralSettings } from "@/components/admin/GeneralSettings";
import { AppointmentSettings } from "@/components/admin/appointments/AppointmentSettings";
import { AppointmentCalendar } from "@/components/admin/appointments/AppointmentCalendar";

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
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Chat Behavior & AI Responses</h2>
                <p className="text-gray-600">Configure how Archibot interacts with users.</p>
                <ChatBehaviorSettings />
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <div className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Appointment Settings</h2>
                  <p className="text-gray-600">Configure appointment booking rules and availability.</p>
                  <AppointmentSettings />
                </section>

                <section className="space-y-4 mt-8">
                  <h2 className="text-xl font-semibold">Appointment Calendar</h2>
                  <p className="text-gray-600">View and manage scheduled appointments.</p>
                  <AppointmentCalendar />
                </section>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Analytics & Performance</h2>
                <p className="text-gray-600">View chat history and performance metrics.</p>
                {/* Analytics content will go here */}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Integrations & API Settings</h2>
                <p className="text-gray-600">Manage external integrations and API access.</p>
                {/* Integration settings will go here */}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
