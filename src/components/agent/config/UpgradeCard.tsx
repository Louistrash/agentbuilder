
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function UpgradeCard() {
  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-200">
          <Zap className="w-5 h-5 text-[#EC4899]" />
          Upgrade to Pro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400">
          Unlock advanced features and increase your training limits:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• Process up to 1,000,000 words</li>
          <li>• Train on 500 pages</li>
          <li>• 90 days data retention</li>
          <li>• API access</li>
          <li>• Priority support</li>
        </ul>
        <Button 
          onClick={() => window.location.href = '/pricing'}
          className="w-full bg-[#EC4899] hover:bg-[#EC4899]/90 mt-4"
        >
          View Plans <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
