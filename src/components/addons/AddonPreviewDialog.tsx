
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Coins, AlertTriangle } from "lucide-react";
import { Addon } from "./types";
import { categoryColors, iconMap } from "./constants";

interface AddonPreviewDialogProps {
  addon: Addon;
  open: boolean;
  onClose: () => void;
  onPurchase: (addon: Addon) => void;
  isPurchased: boolean;
  userTokens: number;
}

export function AddonPreviewDialog({ addon, open, onClose, onPurchase, isPurchased, userTokens }: AddonPreviewDialogProps) {
  const [canAfford, setCanAfford] = useState(false);
  const [showButtonPulse, setShowButtonPulse] = useState(false);
  
  // Check if user has enough tokens, and show pulsing effect when tokens change
  useEffect(() => {
    const hasEnoughTokens = userTokens >= addon.price;
    if (hasEnoughTokens && !canAfford) {
      setShowButtonPulse(true);
      const timer = setTimeout(() => setShowButtonPulse(false), 3000);
      return () => clearTimeout(timer);
    }
    setCanAfford(hasEnoughTokens);
  }, [userTokens, addon.price, canAfford]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#161B22] border-[#30363D] text-white max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${categoryColors[addon.category]}`}>
              {iconMap[addon.icon_name]}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{addon.name}</DialogTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="bg-[#1C2128]/80 text-[#8B949E]">
                  {addon.category.charAt(0).toUpperCase() + addon.category.slice(1)}
                </Badge>
                {isPurchased && <Badge variant="success">Purchased</Badge>}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-gray-300">{addon.description}</p>
          
          <div className="bg-[#1C2128] border border-[#30363D] rounded-lg p-4">
            <h4 className="font-medium text-white mb-3">Features:</h4>
            <ul className="space-y-2">
              {addon.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {!isPurchased && (
            <div className={`p-4 rounded-lg border ${canAfford ? 'border-[#30363D] bg-[#1A1F2C]' : 'border-yellow-600/30 bg-yellow-900/20'}`}>
              <div className="flex items-center gap-3">
                {canAfford ? (
                  <Coins className="h-5 w-5 text-[#1EAEDB]" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <h4 className="font-medium text-white">
                    {canAfford ? 'Ready to Purchase' : 'Not Enough Tokens'}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {canAfford
                      ? `You have ${userTokens} tokens available. This add-on costs ${addon.price} tokens.`
                      : `This add-on requires ${addon.price} tokens, but you only have ${userTokens} tokens.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#30363D] text-white bg-[#222222] hover:bg-[#333333] rounded-md"
          >
            {isPurchased ? 'Close' : 'Cancel'}
          </Button>
          {!isPurchased && (
            <Button
              onClick={() => onPurchase(addon)}
              disabled={!canAfford}
              className={`bg-[#00b8d9] hover:bg-[#00a3c4] text-white rounded-md 
                ${showButtonPulse ? 'animate-pulse ring-2 ring-[#00b8d9]/50' : ''}`}
            >
              <Coins className="mr-2 h-4 w-4" />
              Purchase for {addon.price} Tokens
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
