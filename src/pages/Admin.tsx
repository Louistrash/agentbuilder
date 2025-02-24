import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { BotSettings } from "@/components/BotSettings";
import { LogOut, Home, Settings, MessageSquare, Calendar, BarChart3, Link2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickActionsSettings } from "@/components/QuickActionsSettings";
import { useToast } from "@/hooks/use-toast";
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("general");

  useEffect(() => {
    const checkAdmin = async () => {
      // If not logged in, redirect to auth page
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

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
        <div className="p-6 border-b border-luxury-100 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-luxury-900">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full" onValueChange={setSelectedTab}>
          <div className="border-b border-luxury-100">
            <TabsList className="p-0 h-auto bg-transparent border-b border-luxury-100">
              <TabsTrigger 
                value="general" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
              >
                <Settings className="h-4 w-4" />
                General Settings
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
              >
                <MessageSquare className="h-4 w-4" />
                Chat Behavior
              </TabsTrigger>
              <TabsTrigger 
                value="appointments" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="integrations" 
                className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
              >
                <Link2 className="h-4 w-4" />
                Integrations
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="general" className="mt-0">
              <div className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Bot Name & Branding</h2>
                  <p className="text-gray-600">Customize Archibot's appearance and initial settings.</p>
                  <BotSettings />
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Conversation Starters</h2>
                  <p className="text-gray-600">Configure quick action buttons that appear at the start of each conversation.</p>
                  <QuickActionsSettings />
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold">Quick Response Training</h2>
                  <p className="text-gray-600">Upload training files to improve Archibot's knowledge.</p>
                  <FileUpload />
                </section>
              </div>
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
                <h2 className="text-xl font-semibold">Appointment Management</h2>
                <p className="text-gray-600">Configure showroom appointments and lead collection.</p>
                {/* Appointment settings will go here */}
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
