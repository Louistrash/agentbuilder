
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import { TokensCard } from "@/components/tokens/TokensCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTokens } from "@/context/TokenContext";

export const TokenDisplay = () => {
  const { displayTokens, isLoading } = useTokens();

  if (isLoading) {
    return (
      <Badge variant="outline" className="bg-[#1A1F2C]/50 backdrop-blur-sm border-[#1EAEDB]/20 text-white px-3 py-1.5 flex items-center gap-1.5">
        <Coins className="h-4 w-4 text-[#1EAEDB]" />
        <span>Loading...</span>
      </Badge>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="outline" className="bg-[#1A1F2C]/50 backdrop-blur-sm border-[#1EAEDB]/20 text-white px-3 py-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-[#1A1F2C]/70 transition-colors">
          <Coins className="h-4 w-4 text-[#1EAEDB]" />
          <span>{displayTokens} tokens</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-[#0D1117] border-[#1A1F2C]">
        <TokensCard isPopup={true} />
      </PopoverContent>
    </Popover>
  );
}
