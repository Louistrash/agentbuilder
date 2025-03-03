import { Button } from "@/components/ui/button";
import { useTokens } from "@/context/TokenContext";
import { Coins, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TokensCardProps {
  isPopup?: boolean;
}

export function TokensCard({ isPopup = false }: TokensCardProps) {
  const { displayTokens, isLoading } = useTokens();
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-[#0D1117] rounded-lg border border-[#1A1F2C]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold text-white flex items-center gap-2">
          <Coins className="h-4 w-4 text-[#1EAEDB]" />
          Your Tokens
        </h2>
      </div>

      <div className="bg-[#161B22] p-3 rounded-lg mb-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Available Tokens</span>
          <span className="text-white font-medium">
            {isLoading ? "..." : displayTokens}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Create Agent</span>
          <span className="text-white">30 tokens</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Add Analytics</span>
          <span className="text-white">15 tokens</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Custom Training</span>
          <span className="text-white">20 tokens</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="w-full bg-[#1A1F2C] hover:bg-[#252D3B] text-[#1EAEDB] border border-[#1EAEDB]/30 hover:border-[#1EAEDB]/50"
          onClick={() => navigate('/auth?purchase=tokens')}
        >
          <Coins className="h-3.5 w-3.5 mr-1.5" />
          Buy Tokens
        </Button>
      </div>
    </div>
  );
}