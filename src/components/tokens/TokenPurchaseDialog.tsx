
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TokenPurchaseDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function TokenPurchaseDialog({ open, onClose, message }: TokenPurchaseDialogProps) {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    onClose();
    navigate('/auth?plan=pro');
  };

  const handleBuyTokensClick = () => {
    onClose();
    // In a real app, this could navigate to a token purchase page
    navigate('/auth?purchase=tokens');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] border-gray-700 text-white sm:max-w-[425px] p-4 overflow-hidden">
        <DialogHeader className="mb-2 pb-0 space-y-1.5">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#FEC6A1]" />
            Need More Tokens
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            {message || "You've used all your token credits or reached the limit for free accounts."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-1">
          <div className="bg-[#262E3D] rounded-lg p-3 border border-[#30363D]">
            <h3 className="font-medium text-white mb-1.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Upgrade to Pro
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              Get unlimited tokens and create as many agents as you need.
            </p>
            <ul className="space-y-1 text-xs text-gray-400 mb-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Unlimited AI agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Advanced customization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#262E3D] rounded-lg p-3 border border-[#30363D]">
            <h3 className="font-medium text-white mb-1.5 flex items-center gap-2">
              <Coins className="h-4 w-4 text-[#FEC6A1]" />
              Buy More Tokens
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              Purchase additional tokens to create more agents.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-base font-bold text-white">50</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-xs font-medium text-[#1EAEDB]">$5</div>
              </div>
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-base font-bold text-white">150</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-xs font-medium text-[#1EAEDB]">$12</div>
              </div>
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-base font-bold text-white">500</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-xs font-medium text-[#1EAEDB]">$30</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-between mt-3 pt-0 gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 px-3 bg-[#222222] border-[#30363D] text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBuyTokensClick}
              className="h-9 px-3 bg-[#222222] border-[#FEC6A1]/30 text-[#FEC6A1] hover:bg-[#2A2A2A]"
            >
              <Coins className="mr-1.5 h-4 w-4" />
              Buy Tokens
            </Button>
            <Button
              onClick={handleUpgradeClick}
              className="h-9 px-3 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]"></span>
              <span className="relative flex items-center justify-center">
                <Sparkles className="mr-1.5 h-4 w-4 animate-pulse" />
                Upgrade to Pro
              </span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
