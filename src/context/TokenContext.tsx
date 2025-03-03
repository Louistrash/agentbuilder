import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface TokenContextType {
  tokens: number;
  isLoading: boolean;
  displayTokens: number;
  useTokens: (amount: number, feature: string) => Promise<boolean>;
  refreshTokens: () => Promise<void>;
  animateTokenChange: (targetAmount: number) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<number>(0);
  const [displayTokens, setDisplayTokens] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    setDisplayTokens(tokens);
  }, [tokens]);

  const animateTokenChange = (targetAmount: number) => {
    let start = displayTokens;
    const end = targetAmount;
    const duration = 1500;
    const startTime = performance.now();
    
    const animateToken = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      setDisplayTokens(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateToken);
      }
    };
    
    requestAnimationFrame(animateToken);
  };

  const fetchTokens = async () => {
    if (!user) {
      setTokens(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      
      // First try to get the profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user.id)
        .single();

      if (error) {
        // If profile doesn't exist, create it with 60 tokens
        if (error.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({ 
              id: user.id,
              tokens: 60, // Changed from 50 to 60 tokens
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (createError) throw createError;
          
          // Record initial token transaction
          await supabase
            .from('token_transactions')
            .insert({
              profile_id: user.id,
              amount: 60, // Changed from 50 to 60 tokens
              transaction_type: 'credit',
              description: 'Initial token allocation'
            });

          setTokens(60); // Changed from 50 to 60 tokens
          return;
        }
        throw error;
      }
      
      setTokens(profile?.tokens || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
      toast({
        title: "Error",
        description: "Failed to fetch token balance",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const useTokens = async (amount: number, feature: string): Promise<boolean> => {
    if (!user) return false;
    if (tokens < amount) return false;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ tokens: tokens - amount })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Record token transaction
      await supabase
        .from('token_transactions')
        .insert({
          profile_id: user.id,
          amount: amount,
          transaction_type: 'debit',
          description: `Used for ${feature}`,
          feature_used: feature
        });

      setTokens(data.tokens);
      return true;
    } catch (error) {
      console.error('Error using tokens:', error);
      toast({
        title: 'Failed to use tokens',
        description: 'There was an error processing your tokens. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const refreshTokens = async (): Promise<void> => {
    await fetchTokens();
  };

  useEffect(() => {
    fetchTokens();
  }, [user]);

  return (
    <TokenContext.Provider value={{ 
      tokens, 
      isLoading, 
      displayTokens, 
      useTokens, 
      refreshTokens, 
      animateTokenChange 
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};