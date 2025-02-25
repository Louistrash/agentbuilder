
import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { Card } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";

export const ChatSection = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#0D1117] border-[#30363D] group hover:bg-[#161B22] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <MessageSquare className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Chats</p>
              <p className="text-xl font-semibold text-white">247</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#0D1117] border-[#30363D] group hover:bg-[#161B22] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <Bot className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Bot Status</p>
              <p className="text-xl font-semibold text-white">Online</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#0D1117] border-[#30363D] group hover:bg-[#161B22] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
              <Brain className="h-6 w-6 text-[#EC4899]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">AI Model</p>
              <p className="text-xl font-semibold text-white">GPT-4</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#0D1117] border-[#30363D] group hover:bg-[#161B22] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-colors">
              <Sliders className="h-6 w-6 text-[#6366F1]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Settings</p>
              <p className="text-xl font-semibold text-white">Configured</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#0D1117] border-[#30363D]">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Chat Behavior & AI Responses</h2>
            <p className="text-xs text-gray-400 mt-1">Configure how your AI assistant interacts with users</p>
          </div>
          <div className="relative bg-gradient-to-br from-[#161B22] to-[#1F2937] rounded-lg p-6 border border-[#30363D] shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] mask-gradient"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5]/10 via-[#7C3AED]/10 to-[#EC4899]/10 animate-gradient-slow"></div>
            <div className="relative z-10 text-sm">
              <ChatBehaviorSettings />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
