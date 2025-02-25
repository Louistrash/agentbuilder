
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Boxes, Rocket, Lock } from "lucide-react";

interface QuickStatsProps {
  stats: {
    marketplaceItems: number;
    integrations: number;
    trainingDocs: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <Card className="bg-[#2A2F3E] border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1F2C]">
            <div className="flex items-center gap-3">
              <Boxes className="h-4 w-4 text-[#1EAEDB]" />
              <span className="text-sm text-white">Marketplace Items</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.marketplaceItems}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1F2C]">
            <div className="flex items-center gap-3">
              <Rocket className="h-4 w-4 text-[#1EAEDB]" />
              <span className="text-sm text-white">Active Integrations</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.integrations}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1F2C]">
            <div className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-[#1EAEDB]" />
              <span className="text-sm text-white">Training Documents</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.trainingDocs}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
