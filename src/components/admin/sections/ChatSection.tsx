
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";

export const ChatSection = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <Card className="bg-admin-card border-admin-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader>
          <CardTitle className="text-white">Chat Behavior & AI Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-[#161B22] to-[#1F2937] rounded-lg p-6 border border-admin-border shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] mask-gradient"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-admin-accent-purple/10 via-admin-accent-blue/10 to-admin-accent-pink/10 animate-gradient-flow"></div>
            <div className="relative z-10">
              <ChatBehaviorSettings />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
