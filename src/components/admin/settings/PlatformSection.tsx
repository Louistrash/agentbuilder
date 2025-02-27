
import { Settings2 } from "lucide-react";
import { PlatformOverview } from "../platform/PlatformOverview";

export const PlatformSection = () => {
  return (
    <div className="relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/10 via-[#1EAEDB]/5 to-[#EC4899]/10 opacity-50 group-hover:opacity-70 transition-all duration-300 blur-xl"></div>
      
      <div className="relative z-10 p-6 backdrop-blur-xl bg-[#161B22]/90 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 group-hover:border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1EAEDB]/20 to-[#1EAEDB]/5 flex items-center justify-center">
            <Settings2 className="h-5 w-5 text-[#1EAEDB]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Platform Overview</h3>
            <p className="text-sm text-white/60">System performance and metrics</p>
          </div>
        </div>
        <PlatformOverview />
      </div>
    </div>
  );
};
