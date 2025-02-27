
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Addon } from './types';
import { categoryColors, iconMap } from './constants';

interface AddonCardProps {
  addon: Addon;
  isPurchased: boolean;
  showAddonHighlight: boolean;
  tokens: number;
  onOpenPreview: (addon: Addon) => void;
}

export function AddonCard({ 
  addon, 
  isPurchased, 
  showAddonHighlight, 
  tokens, 
  onOpenPreview 
}: AddonCardProps) {
  return (
    <Card
      key={addon.id}
      className={`bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors 
        ${isPurchased ? 'ring-1 ring-green-500' : ''}
        ${showAddonHighlight && !isPurchased && tokens >= addon.price ? 
          'ring-2 ring-[#1EAEDB] animate-pulse' : ''}`}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg ${categoryColors[addon.category]} w-fit`}>
              {iconMap[addon.icon_name]}
            </div>
            <Badge variant={isPurchased ? "success" : "outline"} className={`ml-auto ${!isPurchased ? "bg-[#1A1F2C] border-[#1EAEDB]/20 text-[#1EAEDB] font-medium" : ""}`}>
              {isPurchased ? 'Purchased' : `${addon.price} tokens`}
            </Badge>
          </div>
          
          <div>
            <h3 className="font-medium text-white text-lg">{addon.name}</h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{addon.description}</p>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenPreview(addon)}
              className="text-white border-[#30363D] bg-[#222222] hover:bg-[#333333] rounded-md"
            >
              Details
            </Button>
            <Button
              size="sm"
              disabled={isPurchased}
              onClick={() => !isPurchased && onOpenPreview(addon)}
              className={`rounded-md ${isPurchased ? 'bg-green-600 hover:bg-green-600' : 'bg-[#00b8d9] hover:bg-[#00a3c4] text-white'} 
                ${showAddonHighlight && !isPurchased && tokens >= addon.price ? 'animate-pulse' : ''}`}
            >
              {isPurchased ? 'Owned' : 'Purchase'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
