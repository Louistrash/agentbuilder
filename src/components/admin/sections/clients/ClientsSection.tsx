
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Feature } from "./types";
import { ClientHeader } from "./ClientHeader";
import { FeaturesList } from "./FeaturesList";
import { UpgradeSection } from "./UpgradeSection";

const ADMIN_FEATURES: Feature[] = [
  {
    id: 'custom_prompt',
    name: 'Custom Prompts',
    description: 'Create and manage custom agent prompts',
    requiredRole: 'admin',
    tokenCost: 50
  },
  {
    id: 'voice_support',
    name: 'Voice Support',
    description: 'Enable voice interactions for your agents',
    requiredRole: 'admin',
    tokenCost: 100
  },
  {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Get detailed insights about your agents',
    requiredRole: 'master',
    tokenCost: 0
  },
  {
    id: 'multi_agent',
    name: 'Multi-Agent Support',
    description: 'Create and manage multiple agents',
    requiredRole: 'master',
    tokenCost: 0
  },
  {
    id: 'white_label',
    name: 'White Labeling',
    description: 'Remove branding and customize appearance',
    requiredRole: 'ceo',
    tokenCost: 0
  }
];

export const ClientsSection = () => {
  const [selectedTab, setSelectedTab] = useState("features");

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user.id)
        .single();

      return {
        role: roles?.[0]?.role || 'user',
        tokens: profile?.tokens || 0
      };
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <ClientHeader userData={userData} />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="bg-[#161B22] border-b border-[#30363D]">
          <TabsTrigger 
            value="features" 
            className="data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-white"
          >
            Available Features
          </TabsTrigger>
          <TabsTrigger 
            value="upgrade" 
            className="data-[state=active]:bg-[#1A1F2C] data-[state=active]:text-white"
          >
            Upgrade Options
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-6">
          <FeaturesList features={ADMIN_FEATURES} userData={userData} />
        </TabsContent>

        <TabsContent value="upgrade" className="mt-6">
          <UpgradeSection userData={userData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
