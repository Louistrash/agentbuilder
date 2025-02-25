
import { IntegrationsSettings } from "../integrations/IntegrationsSettings";
import { Card } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export const IntegrationsSection = () => {
  return (
    <Card className="bg-[#0D1117] border-[#30363D]">
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
            <Link2 className="h-6 w-6 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Integrations & API Settings</h2>
            <p className="text-xs text-gray-400">Manage external integrations and API connections</p>
          </div>
        </div>
        
        <div className="relative bg-gradient-to-br from-[#161B22] to-[#1F2937] rounded-lg p-6 border border-[#30363D] shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] mask-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5]/10 via-[#7C3AED]/10 to-[#EC4899]/10 animate-gradient-slow"></div>
          <div className="relative z-10">
            <IntegrationsSettings />
          </div>
        </div>
      </div>
    </Card>
  );
};
