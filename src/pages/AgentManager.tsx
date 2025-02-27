
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Edit, Plus, Trash2, UserCog, ClipboardCheck, AlertTriangle } from "lucide-react";
import { AgentsList } from "@/components/admin/appointments/AgentsList";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AgentManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("manage");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1EAEDB] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <UserCog className="mr-3 h-8 w-8 text-[#1EAEDB]" />
              Agent Manager
            </h1>
            <p className="text-gray-400 mt-2">
              Create, configure, and manage your agents from one central place
            </p>
          </div>
          
          <Button 
            onClick={() => navigate("/agent-builder")}
            className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#0D1117] border border-[#30363D]">
            <TabsTrigger value="manage" className="data-[state=active]:bg-[#1A1F2C]">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Manage Agents
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#1A1F2C]">
              <UserCog className="w-4 h-4 mr-2" />
              Agent Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-6">
            <Card className="bg-[#0D1117] border-[#30363D]">
              <CardHeader>
                <CardTitle>Your Agents</CardTitle>
                <CardDescription>
                  View and manage all the agents you've created
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgentsList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card className="bg-[#0D1117] border-[#30363D]">
              <CardHeader>
                <CardTitle>Global Agent Settings</CardTitle>
                <CardDescription>
                  Configure default settings for all your agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-[#161B22] border-[#30363D]">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertTitle>Global settings apply to all agents</AlertTitle>
                  <AlertDescription>
                    Changes made here will affect all your agents unless overridden in individual agent settings.
                  </AlertDescription>
                </Alert>
                
                <Separator className="my-6 bg-[#30363D]" />
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-400">
                    Global settings will be available in a future update. For now, please configure each agent individually.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgentManager;
