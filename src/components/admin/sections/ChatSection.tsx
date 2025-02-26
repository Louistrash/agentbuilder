import { ChatBehaviorSettings } from "@/components/ChatBehaviorSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, Brain, Sliders } from "lucide-react";

export const ChatSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-[#161B22] to-[#1A1F2C] border-none shadow-xl">
            <div className="px-6 py-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#9b87f5] p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#161B22] flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-[#6366F1]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#9b87f5]">Active Chats</p>
                  <p className="text-3xl font-bold text-white mt-1">247</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#161B22] to-[#1A1F2C] border-none shadow-xl">
            <div className="px-6 py-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1EAEDB] to-[#33C3F0] p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#161B22] flex items-center justify-center">
                    <Bot className="h-6 w-6 text-[#1EAEDB]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1EAEDB]">Bot Status</p>
                  <p className="text-3xl font-bold text-white mt-1">Online</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-[#161B22] to-[#1A1F2C] border-none shadow-xl">
            <div className="px-6 py-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#D6BCFA] p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#161B22] flex items-center justify-center">
                    <Brain className="h-6 w-6 text-[#EC4899]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#EC4899]">AI Model</p>
                  <p className="text-3xl font-bold text-white mt-1">GPT-4</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#161B22] to-[#1A1F2C] border-none shadow-xl">
            <div className="px-6 py-5">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#9b87f5] p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#161B22] flex items-center justify-center">
                    <Sliders className="h-6 w-6 text-[#6366F1]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6366F1]">Settings</p>
                  <p className="text-3xl font-bold text-white mt-1">Configured</p>
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
          <ChatBehaviorSettings />
        </CardContent>
      </Card>
    </div>
  );
};
