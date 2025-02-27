
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

  // Update the display tokens whenever actual tokens change
  useEffect(() => {
    setDisplayTokens(tokens);
  }, [tokens]);

  const animateTokenChange = (targetAmount: number) => {
    // Start from current display value
    let start = displayTokens;
    const end = targetAmount;
    const duration = 1500; // Animation duration in ms
    const startTime = performance.now();
    
    // Animation function
    const animateToken = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Calculate the current value
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      setDisplayTokens(currentValue);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateToken);
      }
    };
    
    // Start the animation
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
      const { data, error } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user.id)
        .single();

      if (error) {
        // For new users, initialize tokens if profile fetch fails
        if (error.code === 'PGRST116') {
          await initializeUserTokens();
          return;
        }
        throw error;
      }
      
      // If tokens are null or undefined, initialize them
      if (data && (data.tokens === null || data.tokens === undefined)) {
        await initializeUserTokens();
        return;
      }
      
      setTokens(data?.tokens || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeUserTokens = async () => {
    if (!user) return;
    
    try {
      const initialTokens = 50; // Default initial tokens for new users
      
      // Update the profile with initial tokens
      const { data, error } = await supabase
        .from('profiles')
        .update({ tokens: initialTokens })
        .eq('id', user.id)
        .select();

      if (error) throw error;

      // Record initial token transaction
      await supabase.from('token_transactions').insert({
        profile_id: user.id,
        amount: initialTokens,
        description: 'Initial token allocation',
        transaction_type: 'credit'
      });

      setTokens(initialTokens);
      
      toast({
        title: 'Welcome!',
        description: `You've received ${initialTokens} tokens to get started.`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error initializing user tokens:', error);
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
        .select();

      if (error) throw error;

      // Record token transaction
      await supabase.from('token_transactions').insert({
        profile_id: user.id,
        amount: amount,
        description: `Used for ${feature}`,
        transaction_type: 'debit',
        feature_used: feature
      });

      setTokens(data[0].tokens);
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
