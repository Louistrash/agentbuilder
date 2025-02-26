
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Star } from "lucide-react";
import { Feature, UserData } from "./types";
import { useToast } from "@/hooks/use-toast";

interface FeaturesListProps {
  features: Feature[];
  userData: UserData | undefined;
}

export const FeaturesList = ({ features, userData }: FeaturesListProps) => {
  const { toast } = useToast();

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

    toast({
      title: "Feature Activated",
      description: `Successfully activated ${feature.name}`
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature) => (
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
  );
};
