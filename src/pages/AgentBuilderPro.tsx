import React, { useState, useEffect } from 'react';
import { Header } from '@/components/agent/Header';
import { useTokens } from '@/context/TokenContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AgentBuilderPro() {
  const { tokens, useTokens: spendTokens } = useTokens();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (tokens < 50) {
      toast({
        title: "Insufficient Tokens",
        description: "You need at least 50 tokens to access Pro features.",
        variant: "destructive"
      });
      navigate('/agent-builder');
    }
  }, [tokens, navigate, toast]);

  const handleProFeatureUse = async (featureName: string, tokenCost: number) => {
    setIsLoading(true);
    try {
      const success = await spendTokens(tokenCost, featureName);
      
      if (success) {
        toast({
          title: "Success",
          description: `Used ${tokenCost} tokens for ${featureName}`,
        });
      } else {
        toast({
          title: "Failed",
          description: "Insufficient tokens for this feature",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error using pro feature:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          <Header />
          
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
            <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
              <h2 className="text-lg font-semibold text-white">Pro Agent Builder</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-400">Access to advanced agent builder features.</p>
              
              <div className="mt-4 p-4 bg-[#1C2128] rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Current Token Balance:</span>
                  <span className="font-semibold text-blue-400">{tokens} tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
