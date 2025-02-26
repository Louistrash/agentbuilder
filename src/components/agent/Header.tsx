
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AgentTemplates } from "./AgentTemplates";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10">
            <Bot className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Agent Builder</h1>
            <p className="text-gray-400 mt-1">Create and customize your AI agents</p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/auth?plan=pro')}
          className="hidden sm:flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Upgrade to Pro
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5"></div>
        <div className="relative">
          <AgentTemplates />
        </div>
      </div>
    </div>
  );
}
