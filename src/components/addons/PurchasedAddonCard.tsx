
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Addon, PurchasedAddon } from './types';
import { categoryColors, iconMap } from './constants';

interface PurchasedAddonCardProps {
  purchasedAddon: PurchasedAddon;
  addon: Addon;
  onOpenPreview: (addon: Addon) => void;
}

export function PurchasedAddonCard({ 
  purchasedAddon, 
  addon, 
  onOpenPreview 
}: PurchasedAddonCardProps) {
  return (
    <Card
      key={purchasedAddon.id}
      className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors cursor-pointer ring-1 ring-green-500"
      onClick={() => onOpenPreview(addon)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-lg ${categoryColors[addon.category]} w-fit`}>
              {iconMap[addon.icon_name]}
            </div>
            <Badge variant="success" className="ml-auto">Active</Badge>
          </div>
          
          <div>
            <h3 className="font-medium text-white text-lg">{addon.name}</h3>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{addon.description}</p>
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-gray-500">Purchased on {new Date(purchasedAddon.purchased_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
