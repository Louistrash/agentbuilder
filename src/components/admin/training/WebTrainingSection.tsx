
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UsageStats {
  totalWordsUsed: number;
  wordsLimit: number;
}

export const WebTrainingSection = () => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const fetchUsageStats = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('organization_usage')
      .select('total_words_used, words_limit')
      .eq('profile_id', user.id)
      .maybeSingle();

    if (data) {
      setUsage({
        totalWordsUsed: data.total_words_used,
        wordsLimit: data.words_limit
      });
    }
  };

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: usage } = await supabase
        .from('organization_usage')
        .select('total_words_used, words_limit')
        .eq('profile_id', user.id)
        .single();

      if (usage && usage.total_words_used >= usage.words_limit) {
        toast({
          title: "Usage Limit Reached",
          description: "You've reached your word limit. Please upgrade your plan to continue.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('website_training_sources')
        .insert({
          url,
          profile_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Website added to training queue. Processing will begin shortly.",
      });

      setUrl("");
      fetchUsageStats();
    } catch (error) {
      console.error('Error processing URL:', error);
      toast({
        title: "Error",
        description: "Failed to process the website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Web Training Sources</h2>
        <p className="text-sm text-gray-600">
          Add website URLs to train the AI with your content. Only public pages will be processed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com/products)"
              className="w-full"
              disabled={isProcessing}
            />
          </div>
          <Button type="submit" disabled={isProcessing || !url}>
            <Globe className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing..." : "Add Website"}
          </Button>
        </div>
      </form>

      {usage && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage Usage</span>
            <span>{Math.round((usage.totalWordsUsed / usage.wordsLimit) * 100)}%</span>
          </div>
          <Progress 
            value={(usage.totalWordsUsed / usage.wordsLimit) * 100} 
            className="h-2"
          />
          <div className="flex items-start gap-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <p>
              Using {usage.totalWordsUsed.toLocaleString()} of {usage.wordsLimit.toLocaleString()} words.
              {usage.totalWordsUsed >= usage.wordsLimit * 0.9 && 
                " Consider upgrading your plan to ensure uninterrupted service."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
