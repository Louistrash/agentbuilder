
import { Bot, Sparkles, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TokenDisplay } from "@/components/layout/TokenDisplay";
import { useTokens } from "@/context/TokenContext";

export function Header() {
  const navigate = useNavigate();
  const { tokens, isLoading } = useTokens();

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
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center bg-[#1A1F2C]/80 rounded-lg px-3 py-2 border border-[#30363D]">
            <Coins className="h-4 w-4 text-[#FEC6A1] mr-2" />
            <span className="text-white font-medium">
              {isLoading ? "..." : tokens} tokens
            </span>
          </div>
          <Button
            onClick={() => navigate('/auth?plan=pro')}
            className="items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
