
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Globe, Loader2 } from "lucide-react";

interface TrainingSectionProps {
  trainingUrl: string;
  isProcessing: boolean;
  onUrlChange: (url: string) => void;
  onTrain: () => void;
}

export function TrainingSection({ 
  trainingUrl, 
  isProcessing, 
  onUrlChange, 
  onTrain 
}: TrainingSectionProps) {
  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-200">
          <Globe className="w-5 h-5 text-[#EC4899]" />
          Train with Website Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url" className="text-white">Website URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={trainingUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://example.com"
              className="bg-[#1C2128] border-[#30363D] flex-1"
              disabled={isProcessing}
            />
            <Button 
              onClick={onTrain}
              disabled={isProcessing || !trainingUrl}
              className="bg-[#EC4899] hover:bg-[#EC4899]/90 text-white font-medium min-w-[120px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Training...
                </>
              ) : (
                'Train Agent'
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-400">
            Free users can train with up to 5 pages. Upgrade to Pro for unlimited training data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
