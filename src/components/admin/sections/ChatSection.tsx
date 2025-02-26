
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { AgentsList } from "../appointments/AgentsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ChatSection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="bg-[#161B22] border-b border-[#30363D]">
          <TabsTrigger 
            value="agents" 
            className="data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-white"
          >
            Chat Agents
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-white"
          >
            Chat Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-[#161B22] to-[#1A1F2C] border-none shadow-xl">
              <div className="px-6 py-5">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#9b87f5] p-[1px]">
                    <div className="w-full h-full rounded-2xl bg-[#161B22] flex items-center justify-center">
                      <Bot className="h-6 w-6 text-[#6366F1]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#6366F1]">Active Agents</p>
                    <p className="text-3xl font-bold text-white mt-1">Archibot</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <AgentsList />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Chat Behavior & AI Responses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ChatBehaviorSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
