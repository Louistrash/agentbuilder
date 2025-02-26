
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Coins,
  Star
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  name: string;
  description: string;
  requiredRole: 'admin' | 'master' | 'ceo';
  tokenCost: number;
}

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
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("features");

  // Fetch user's role and tokens
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

  const handleFeatureActivation = async (feature: Feature) => {
    if (!userData) return;

    if (feature.requiredRole === 'ceo') {
      toast({
        title: "Access Denied",
        description: "This feature is only available to CEO admins",
        variant: "destructive"
      });
      return;
    }

    if (feature.requiredRole === 'master' && userData.role !== 'master' && userData.role !== 'ceo') {
      toast({
        title: "Upgrade Required",
        description: "This feature requires a Master account. Please upgrade to access.",
        variant: "destructive"
      });
      return;
    }

    if (feature.tokenCost > 0 && userData.tokens < feature.tokenCost) {
      toast({
        title: "Insufficient Tokens",
        description: `You need ${feature.tokenCost} tokens to activate this feature`,
        variant: "destructive"
      });
      return;
    }

    // Here you would implement the feature activation logic
    toast({
      title: "Feature Activated",
      description: `Successfully activated ${feature.name}`
    });
  };

  const handleUpgradeToMaster = () => {
    toast({
      title: "Upgrade Request",
      description: "Your upgrade request to Master has been submitted for review."
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Client Dashboard</h2>
          <p className="text-sm text-gray-400">Manage your agent features and access levels</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-[#1A1F2C] px-3 py-1.5">
            <Coins className="w-4 h-4 mr-2 text-yellow-500" />
            {userData?.tokens} tokens
          </Badge>
          <Badge 
            variant="outline" 
            className={`px-3 py-1.5 ${
              userData?.role === 'ceo' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : userData?.role === 'master'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                : 'bg-[#1A1F2C]'
            }`}
          >
            {userData?.role === 'ceo' ? (
              <Crown className="w-4 h-4 mr-2" />
            ) : userData?.role === 'master' ? (
              <ShieldCheck className="w-4 h-4 mr-2" />
            ) : (
              <Shield className="w-4 h-4 mr-2" />
            )}
            {userData?.role.toUpperCase()}
          </Badge>
        </div>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADMIN_FEATURES.map((feature) => (
              <Card key={feature.id} className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-white">{feature.name}</span>
                    {feature.requiredRole === 'ceo' ? (
                      <Lock className="w-5 h-5 text-gray-500" />
                    ) : feature.requiredRole === 'master' ? (
                      <Star className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Unlock className="w-5 h-5 text-green-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      {feature.tokenCost > 0 ? `${feature.tokenCost} tokens` : 'Included'}
                    </Badge>
                    <Button
                      variant="outline"
                      onClick={() => handleFeatureActivation(feature)}
                      disabled={
                        feature.requiredRole === 'ceo' ||
                        (feature.requiredRole === 'master' && userData?.role === 'admin')
                      }
                    >
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upgrade" className="mt-6">
          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="text-white">Upgrade to Master Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                Upgrade to Master Admin to unlock additional features and capabilities:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Advanced analytics and reporting</li>
                <li>Multi-agent support</li>
                <li>Priority support access</li>
                <li>Extended API access</li>
              </ul>
              <Button 
                className="w-full mt-4"
                onClick={handleUpgradeToMaster}
                disabled={userData?.role === 'master' || userData?.role === 'ceo'}
              >
                {userData?.role === 'master' ? 'Already a Master Admin' : 
                 userData?.role === 'ceo' ? 'CEO Admin' : 'Request Upgrade'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
