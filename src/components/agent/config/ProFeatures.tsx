
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

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

export function ProFeatures({ features, onFeatureToggle }: ProFeaturesProps) {
  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader className="border-b border-[#30363D]">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Lock className="w-5 h-5 text-[#1EAEDB]" />
          Pro Features
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="p-4 rounded-lg bg-[#1C2128] border border-[#30363D] space-y-3"
          >
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
              onCheckedChange={() => onFeatureToggle(feature.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
