
import React from 'react';

interface AddonTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AddonTabs({ activeTab, setActiveTab }: AddonTabsProps) {
  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-md p-1 inline-flex">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'all' ? 'bg-[#1C2128] text-white' : 'text-gray-400 hover:text-white'}`}
        onClick={() => setActiveTab('all')}
      >
        All Add-ons
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'purchased' ? 'bg-[#1C2128] text-white' : 'text-gray-400 hover:text-white'}`}
        onClick={() => setActiveTab('purchased')}
      >
        Purchased
      </button>
    </div>
  );
}
