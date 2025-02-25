
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

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
    <Badge variant="outline" className="bg-[#1A1F2C]/50 backdrop-blur-sm border-[#1EAEDB]/20 text-white px-3 py-1 flex items-center gap-1.5">
      <Coins className="h-4 w-4 text-[#1EAEDB]" />
      <span>{tokens} tokens</span>
    </Badge>
  );
};
