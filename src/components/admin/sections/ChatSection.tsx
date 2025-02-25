
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";

export const ChatSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card className="bg-admin-card border-admin-border group hover:bg-[#161B22] transition-all duration-300">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-admin-accent-purple/10 flex items-center justify-center group-hover:bg-admin-accent-purple/20 transition-colors">
                  <MessageSquare className="h-6 w-6 text-admin-accent-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Chats</p>
                  <p className="text-xl font-semibold text-white">247</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-admin-card border-admin-border group hover:bg-[#161B22] transition-all duration-300">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-admin-accent-blue/10 flex items-center justify-center group-hover:bg-admin-accent-blue/20 transition-colors">
                  <Bot className="h-6 w-6 text-admin-accent-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bot Status</p>
                  <p className="text-xl font-semibold text-white">Online</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-admin-card border-admin-border group hover:bg-[#161B22] transition-all duration-300">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-admin-accent-pink/10 flex items-center justify-center group-hover:bg-admin-accent-pink/20 transition-colors">
                  <Brain className="h-6 w-6 text-admin-accent-pink" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">AI Model</p>
                  <p className="text-xl font-semibold text-white">GPT-4</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-admin-card border-admin-border group hover:bg-[#161B22] transition-all duration-300">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-admin-accent-purple/10 flex items-center justify-center group-hover:bg-admin-accent-purple/20 transition-colors">
                  <Sliders className="h-6 w-6 text-admin-accent-purple" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Settings</p>
                  <p className="text-xl font-semibold text-white">Configured</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-admin-card border-admin-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">Chat Behavior & AI Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0D1117] rounded-lg p-4 border border-[#30363D]">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Chat Configuration</h3>
              <div className="space-y-4">
                <ChatBehaviorSettings />
              </div>
            </div>
            <div className="bg-[#0D1117] rounded-lg p-4 border border-[#30363D]">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Response Settings</h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#9b87f5]/5 via-[#1EAEDB]/5 to-[#EC4899]/5 animate-gradient-flow rounded-lg"></div>
                <div className="relative z-10">
                  <ChatBehaviorSettings />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
