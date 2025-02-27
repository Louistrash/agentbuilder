
import React from 'react';
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProFeatures() {
  return (
    <div className="bg-gradient-to-r from-[#191E29] to-[#1C1C28] rounded-xl border border-[#30363D] overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FEC6A1]/20 px-3 py-1.5 rounded-full">
              <Lock className="w-4 h-4 text-[#FEC6A1]" />
              <span className="text-xs font-medium text-[#FEC6A1]">Pro Features</span>
            </div>
            
            <h3 className="text-xl font-bold text-white">Unlock advanced capabilities</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-[#FEC6A1]/20 text-[#FEC6A1]">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-300">Custom training data</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-[#FEC6A1]/20 text-[#FEC6A1]">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-300">Multi-agent collaboration</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-[#FEC6A1]/20 text-[#FEC6A1]">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-300">Advanced analytics</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full p-1 bg-[#FEC6A1]/20 text-[#FEC6A1]">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-300">API integrations</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-[#FEC6A1] hover:bg-[#FEC6A1]/90 text-[#0D1117] font-medium">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
