
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Boxes, Rocket, Book } from "lucide-react";

interface QuickStatsProps {
  stats: {
    marketplaceItems: number;
    integrations: number;
    trainingDocs: number;
  };
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <Card className="bg-admin-card border-admin-border">
      <CardHeader>
        <CardTitle className="text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D1117] border border-admin-border hover:border-admin-accent-purple/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-admin-accent-purple/10 flex items-center justify-center group-hover:bg-admin-accent-purple/20 transition-colors">
                <Boxes className="h-5 w-5 text-admin-accent-purple" />
              </div>
              <span className="text-sm text-gray-300">Marketplace Items</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.marketplaceItems}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D1117] border border-admin-border hover:border-admin-accent-pink/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-admin-accent-pink/10 flex items-center justify-center group-hover:bg-admin-accent-pink/20 transition-colors">
                <Rocket className="h-5 w-5 text-admin-accent-pink" />
              </div>
              <span className="text-sm text-gray-300">Active Integrations</span>
            </div>
            <span className="text-sm font-bold text-white">{stats.integrations}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D1117] border border-admin-border hover:border-admin-accent-blue/50 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-admin-accent-blue/10 flex items-center justify-center group-hover:bg-admin-accent-blue/20 transition-colors">
                <Book className="h-5 w-5 text-admin-accent-blue" />
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
