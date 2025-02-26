
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import { TokensCard } from "@/components/tokens/TokensCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const TokenDisplay = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchTokens();
    }
  }, [user]);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setTokens(data?.tokens || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  if (!user || tokens === null) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="outline" className="bg-[#1A1F2C]/50 backdrop-blur-sm border-[#1EAEDB]/20 text-white px-3 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-[#1A1F2C]/70 transition-colors">
          <Coins className="h-4 w-4 text-[#1EAEDB]" />
          <span>{tokens} tokens</span>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <div className="scale-[0.7] origin-top">
          <TokensCard isPopup={true} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
