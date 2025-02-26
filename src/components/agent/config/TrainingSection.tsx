
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface UsageStats {
  totalWordsUsed: number;
  wordsLimit: number;
  pagesProcessed: number;
  pagesLimit: number;
}

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);

  useEffect(() => {
    fetchUsageStats();
  }, [user]);

  const fetchUsageStats = async () => {
    if (!user) return;

    try {
      const { data: usage, error } = await supabase
        .from('organization_usage')
        .select('total_words_used, words_limit')
        .eq('profile_id', user.id)
        .single();

      if (error) throw error;

      // Get pages processed from website_training_sources
      const { data: pages, error: pagesError } = await supabase
        .from('website_training_sources')
        .select('id')
        .eq('profile_id', user.id)
        .eq('processed', true);

      if (pagesError) throw pagesError;

      setUsageStats({
        totalWordsUsed: usage?.total_words_used || 0,
        wordsLimit: usage?.words_limit || 100000, // Default 100k words for free tier
        pagesProcessed: pages?.length || 0,
        pagesLimit: 50 // Free tier limit
      });
    } catch (error) {
      console.error('Error fetching usage stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch usage statistics",
        variant: "destructive",
      });
    }
  };

  const wordsPercentage = usageStats ? (usageStats.totalWordsUsed / usageStats.wordsLimit) * 100 : 0;
  const pagesPercentage = usageStats ? (usageStats.pagesProcessed / usageStats.pagesLimit) * 100 : 0;
  const isOverLimit = wordsPercentage >= 100 || pagesPercentage >= 100;

  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-200">
          <Globe className="w-5 h-5 text-[#EC4899]" />
          Train with Website Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Website URL</Label>
            <div className="flex gap-2">
              <Input
                value={trainingUrl}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://example.com"
                className="bg-[#1C2128] border-[#30363D] flex-1"
                disabled={isProcessing || isOverLimit}
              />
              <Button 
                onClick={onTrain}
                disabled={isProcessing || !trainingUrl || isOverLimit}
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
          </div>

          {usageStats && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Words Usage</span>
                  <span className="text-gray-400">{Math.round(wordsPercentage)}%</span>
                </div>
                <Progress value={wordsPercentage} className="h-2" />
                <p className="text-sm text-gray-400">
                  {usageStats.totalWordsUsed.toLocaleString()} / {usageStats.wordsLimit.toLocaleString()} words
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pages Processed</span>
                  <span className="text-gray-400">{Math.round(pagesPercentage)}%</span>
                </div>
                <Progress value={pagesPercentage} className="h-2" />
                <p className="text-sm text-gray-400">
                  {usageStats.pagesProcessed} / {usageStats.pagesLimit} pages
                </p>
              </div>

              {isOverLimit && (
                <div className="flex items-start gap-2 p-3 bg-[#EC4899]/10 rounded-lg border border-[#EC4899]/20">
                  <AlertCircle className="w-5 h-5 text-[#EC4899] mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#EC4899]">Usage Limit Reached</p>
                    <p className="text-sm text-gray-400">
                      Upgrade to Pro for increased limits and additional features.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899]/10"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      Upgrade to Pro
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-gray-400">
            Free users can train with up to 50 pages and 100,000 words. 
            Upgrade to Pro for unlimited training data and additional features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
