
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type SubscriptionTier = {
  id: string;
  name: 'free' | 'pro' | 'enterprise';
  words_limit: number;
  pages_limit: number;
  storage_days: number;
  price: number;
  features: {
    api_access: boolean;
    priority_support: boolean;
    custom_training: boolean;
    custom_models?: boolean;
  };
};

type DbSubscriptionTier = Database['public']['Tables']['subscription_tiers']['Row'];

export function SubscriptionTiers() {
  const { toast } = useToast();

  const { data: tiers, isLoading } = useQuery({
    queryKey: ['subscription-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .order('price');
      
      if (error) throw error;
      
      // Transform the data to ensure proper typing
      return (data as DbSubscriptionTier[]).map(tier => ({
        ...tier,
        features: tier.features as SubscriptionTier['features']
      })) as SubscriptionTier[];
    }
  });

  const handleUpgrade = async (tierId: string) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tierId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to initiate upgrade process. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers?.map((tier) => (
        <Card 
          key={tier.id}
          className={`bg-[#161B22] border-[#30363D] ${
            tier.name === 'pro' ? 'ring-2 ring-[#EC4899]' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className="flex flex-col gap-2">
              <span className="text-zinc-200">{tier.name.toUpperCase()}</span>
              <span className="text-3xl font-bold text-white">
                ${tier.price}
                <span className="text-sm text-gray-400">/month</span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#EC4899]" />
                {tier.words_limit.toLocaleString()} words
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#EC4899]" />
                {tier.pages_limit} pages
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#EC4899]" />
                {tier.storage_days} days data retention
              </li>
              {tier.features.api_access && (
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[#EC4899]" />
                  API Access
                </li>
              )}
              {tier.features.priority_support && (
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[#EC4899]" />
                  Priority Support
                </li>
              )}
              {tier.features.custom_training && (
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[#EC4899]" />
                  Custom Training Options
                </li>
              )}
              {tier.features.custom_models && (
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-[#EC4899]" />
                  Custom AI Models
                </li>
              )}
            </ul>

            <Button
              onClick={() => handleUpgrade(tier.id)}
              className={
                tier.name === 'free' 
                  ? 'w-full bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
                  : 'w-full bg-[#EC4899] hover:bg-[#EC4899]/90'
              }
              disabled={tier.name === 'free'}
            >
              {tier.name === 'free' ? 'Current Plan' : 'Upgrade Now'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
