import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { TokenPurchaseDialog } from "@/components/tokens/TokenPurchaseDialog";

interface ProFeature {
  id: string;
  name: string;
  description: string;
  tokens: number;
  enabled: boolean;
}

interface ProFeaturesProps {
  features: ProFeature[];
  onFeatureToggle: (featureId: string) => void;
}

export function ProFeatures({
  features,
  onFeatureToggle
}: ProFeaturesProps) {
  const [showTokenDialog, setShowTokenDialog] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState<ProFeature | null>(null);

  const handleFeatureClick = (feature: ProFeature) => {
    if (!feature.enabled) {
      setSelectedFeature(feature);
      setShowTokenDialog(true);
    } else {
      onFeatureToggle(feature.id);
    }
  };

  return (
    <>
      <Card className="bg-[#161B22] border-[#30363D]">
        <CardHeader className="border-b border-[#30363D]">
          <CardTitle className="flex items-center gap-2 text-lg font-medium text-zinc-200">
            <Lock className="w-5 h-5 text-[#1EAEDB]" />
            Pro Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {features.map(feature => (
            <div 
              key={feature.id} 
              className="p-4 rounded-lg bg-[#1C2128] border border-[#30363D] space-y-3 relative group cursor-pointer"
              onClick={() => handleFeatureClick(feature)}
            >
              {!feature.enabled && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{feature.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {feature.description}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-[#1EAEDB]/10 text-[#1EAEDB] border-0">
                  {feature.tokens} tokens
                </Badge>
              </div>
              <Switch 
                checked={feature.enabled} 
                disabled={!feature.enabled}
                className="opacity-50 cursor-not-allowed"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <TokenPurchaseDialog
        open={showTokenDialog}
        onClose={() => setShowTokenDialog(false)}
        message={selectedFeature ? `You need ${selectedFeature.tokens} tokens to enable ${selectedFeature.name}.` : undefined}
      />
    </>
  );
}