
import React from 'react';
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddonEmptyStateProps {
  activeTab: string;
  onExplore: () => void;
}

export function AddonEmptyState({ activeTab, onExplore }: AddonEmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="bg-[#1C2128] border border-[#30363D] rounded-xl p-8 inline-block">
        {activeTab === 'all' ? (
          <>
            <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-200">No add-ons found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </>
        ) : (
          <>
            <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-200">No purchased add-ons</h3>
            <p className="text-gray-400 mt-2">Browse the marketplace to enhance your agents</p>
            <Button 
              className="mt-4 bg-[#222222] hover:bg-[#333333] text-white rounded-md"
              onClick={onExplore}
            >
              Explore Add-ons
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
