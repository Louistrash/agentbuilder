
import React from 'react';
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categoryTextColors } from './constants';

interface AddonSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

export function AddonSearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}: AddonSearchAndFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search add-ons..."
          className="pl-8 bg-[#1C2128] border-[#30363D] text-white w-full md:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto py-2 w-full md:w-auto">
        <Filter className="h-4 w-4 text-gray-400 min-w-[16px]" />
        <Button
          key="all"
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={`min-w-[70px] rounded-md ${
            selectedCategory === null 
              ? 'bg-[#222222] hover:bg-[#333333] text-[#1EAEDB] font-medium' 
              : 'bg-transparent text-gray-300 hover:bg-[#222222] hover:text-[#1EAEDB] border-[#30363D]'
          }`}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`min-w-[100px] rounded-md ${
              selectedCategory === category 
                ? `bg-[#222222] hover:bg-[#333333] ${categoryTextColors[category]} font-medium` 
                : `bg-transparent text-gray-300 hover:bg-[#222222] hover:${categoryTextColors[category]} border-[#30363D]`
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
