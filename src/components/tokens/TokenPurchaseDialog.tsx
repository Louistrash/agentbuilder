
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
      <DialogContent className="bg-[#1A1F2C] border-gray-700 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#FEC6A1]" />
            Need More Tokens
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {message || "You've used all your token credits or reached the limit for free accounts."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="bg-[#262E3D] rounded-lg p-4 border border-[#30363D]">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Upgrade to Pro
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Get unlimited tokens and create as many agents as you need.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 mb-4">
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
          
          <div className="bg-[#262E3D] rounded-lg p-4 border border-[#30363D]">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2">
              <Coins className="h-4 w-4 text-[#FEC6A1]" />
              Buy More Tokens
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Purchase additional tokens to create more agents.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-lg font-bold text-white">50</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-sm font-medium text-[#1EAEDB] mt-1">$5</div>
              </div>
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-lg font-bold text-white">150</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-sm font-medium text-[#1EAEDB] mt-1">$12</div>
              </div>
              <div className="bg-[#1C2128] p-2 rounded-lg border border-[#30363D] text-center">
                <div className="text-lg font-bold text-white">500</div>
                <div className="text-xs text-gray-400">tokens</div>
                <div className="text-sm font-medium text-[#1EAEDB] mt-1">$30</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-[#30363D] text-gray-400 hover:bg-[#30363D] hover:text-white"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleBuyTokensClick}
            className="w-full sm:w-auto border-[#FEC6A1]/30 text-[#FEC6A1] hover:bg-[#FEC6A1]/10"
          >
            <Coins className="mr-2 h-4 w-4" />
            Buy Tokens
          </Button>
          <Button
            onClick={handleUpgradeClick}
            className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
