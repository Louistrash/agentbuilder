
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
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader>
        <CardTitle className="text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0D1117] border border-[#30363D]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
                <Boxes className="h-4 w-4 text-[#6366F1]" />
              </div>
              <span className="text-sm text-gray-300">Marketplace Items</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.marketplaceItems}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0D1117] border border-[#30363D]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center">
                <Rocket className="h-4 w-4 text-[#EC4899]" />
              </div>
              <span className="text-sm text-gray-300">Active Integrations</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.integrations}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg bg-[#0D1117] border border-[#30363D]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                <Lock className="h-4 w-4 text-[#10B981]" />
              </div>
              <span className="text-sm text-gray-300">Training Documents</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.trainingDocs}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
