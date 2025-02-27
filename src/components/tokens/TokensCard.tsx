
import { Button } from "@/components/ui/button";
import { useTokens } from "@/context/TokenContext";
import { Coins, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TokensCardProps {
  isPopup?: boolean;
}

export function TokensCard({ isPopup = false }: TokensCardProps) {
  const { tokens, isLoading } = useTokens();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-[#0D1117] rounded-lg border border-[#1A1F2C]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold text-white flex items-center gap-2">
          <Coins className="h-4 w-4 text-[#1EAEDB]" />
          Your Tokens
        </h2>
        {!isPopup && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#30363D] hover:bg-[#1A1F2C]"
            onClick={() => navigate('/auth?plan=pro')}
          >
            <Sparkles className="h-3 w-3 mr-1" /> Upgrade
          </Button>
        )}
      </div>

      <div className="bg-[#161B22] p-3 rounded-lg mb-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Available Tokens</span>
          <span className="text-white font-medium">
            {isLoading ? "..." : tokens}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Agent Creation</span>
          <span className="text-white">25 tokens</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Custom Training</span>
          <span className="text-white">10 tokens</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Advanced Features</span>
          <span className="text-white">15 tokens</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-[#1EAEDB]/30 text-[#1EAEDB] hover:bg-[#1EAEDB]/10"
          onClick={() => navigate('/auth?purchase=tokens')}
        >
          <Coins className="h-3.5 w-3.5 mr-1.5" />
          Buy Tokens
        </Button>
        {isPopup && (
          <Button
            size="sm"
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={() => navigate('/auth?plan=pro')}
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Upgrade
          </Button>
        )}
      </div>
    </div>
  );
}
