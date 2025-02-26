
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
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

const tierFeatureLabels = {
  api_access: 'API Toegang',
  priority_support: 'Priority Support',
  custom_training: 'Aangepaste Training',
  custom_models: 'Aangepaste Modellen',
};

export function SubscriptionTiers() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: tiers, isLoading } = useQuery({
    queryKey: ['subscription-tiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .order('price');
      
      if (error) throw error;
      
      return (data as DbSubscriptionTier[]).map(tier => ({
        ...tier,
        features: tier.features as SubscriptionTier['features']
      })) as SubscriptionTier[];
    }
  });

  const handleUpgrade = async (tierId: string) => {
    if (!user) {
      toast({
        title: "Authenticatie Vereist",
        description: "Log in om je abonnement te upgraden.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: { tierId, userId: user.id }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Fout bij het maken van checkout sessie:', error);
      toast({
        title: "Fout",
        description: "Upgrade proces mislukt. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers?.map((tier) => (
        <Card key={tier.id} className="relative bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {tier.name === 'free' ? 'Gratis' : tier.name === 'pro' ? 'Pro' : 'Enterprise'}
            </CardTitle>
            <div className="text-3xl font-bold">
              €{tier.price}{' '}
              <span className="text-sm font-normal text-muted-foreground">/maand</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Tot {tier.words_limit.toLocaleString()} woorden
                </p>
                <p className="text-sm text-muted-foreground">
                  {tier.pages_limit} pagina's
                </p>
                <p className="text-sm text-muted-foreground">
                  {tier.storage_days} dagen opslag
                </p>
              </div>
              <div className="space-y-2">
                {Object.entries(tier.features).map(([key, enabled]) => (
                  <div key={key} className="flex items-center">
                    <Check className={`h-4 w-4 mr-2 ${enabled ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={`text-sm ${enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {tierFeatureLabels[key as keyof typeof tierFeatureLabels]}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() => handleUpgrade(tier.id)}
                variant={tier.name === 'free' ? 'outline' : 'default'}
              >
                {tier.name === 'free' ? 'Huidige Plan' : 'Nu Upgraden'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
