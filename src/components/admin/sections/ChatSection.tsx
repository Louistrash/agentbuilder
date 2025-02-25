
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";

export const ChatSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stats Cards with Apple-style design */}
        <div className="space-y-4">
          <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10 group hover:border-white/20 transition-all duration-300">
            <div className="px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#6366F1]/5 flex items-center justify-center group-hover:from-[#6366F1]/30 group-hover:to-[#6366F1]/10 transition-all duration-300">
                  <MessageSquare className="h-6 w-6 text-[#6366F1]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Active Chats</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">247</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10 group hover:border-white/20 transition-all duration-300">
            <div className="px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1EAEDB]/20 to-[#1EAEDB]/5 flex items-center justify-center group-hover:from-[#1EAEDB]/30 group-hover:to-[#1EAEDB]/10 transition-all duration-300">
                  <Bot className="h-6 w-6 text-[#1EAEDB]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Bot Status</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Online</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10 group hover:border-white/20 transition-all duration-300">
            <div className="px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EC4899]/20 to-[#EC4899]/5 flex items-center justify-center group-hover:from-[#EC4899]/30 group-hover:to-[#EC4899]/10 transition-all duration-300">
                  <Brain className="h-6 w-6 text-[#EC4899]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">AI Model</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">GPT-4</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10 group hover:border-white/20 transition-all duration-300">
            <div className="px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#6366F1]/5 flex items-center justify-center group-hover:from-[#6366F1]/30 group-hover:to-[#6366F1]/10 transition-all duration-300">
                  <Sliders className="h-6 w-6 text-[#6366F1]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/60">Settings</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Configured</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="bg-[#161B22]/90 backdrop-blur-xl border border-white/10">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Chat Behavior & AI Responses
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#0D1117]/80 backdrop-blur-sm p-5 border border-white/10">
              <h3 className="text-base font-semibold text-white/90 mb-4">Chat Configuration</h3>
              <div className="space-y-4">
                <ChatBehaviorSettings />
              </div>
            </div>
            <div className="rounded-2xl bg-[#0D1117]/80 backdrop-blur-sm p-5 border border-white/10">
              <h3 className="text-base font-semibold text-white/90 mb-4">Response Settings</h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-[#1EAEDB]/5 to-[#EC4899]/5 animate-gradient-flow rounded-xl"></div>
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
