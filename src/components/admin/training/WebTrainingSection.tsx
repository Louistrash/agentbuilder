import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WebTrainingList } from "./WebTrainingList";

interface UsageStats {
  totalWordsUsed: number;
  wordsLimit: number;
}

interface WebsiteTrainingSource {
  id: string;
  url: string;
  processed: boolean;
  word_count: number;
  status: string;
  error_message?: string;
  profile_id: string;
}

interface WebsiteTrainingSourceInsert {
  url: string;
  profile_id: string;
  status: string;
  processed?: boolean;
  word_count?: number;
}

interface OrganizationUsage {
  total_words_used: number;
  words_limit: number;
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existingUsage } = await supabase
        .from('organization_usage')
        .select()
        .eq('profile_id', user.id)
        .maybeSingle();

      if (!existingUsage) {
        await supabase.from('organization_usage').insert({
          profile_id: user.id,
          total_words_used: 0,
          words_limit: 100000
        });
      }

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
    } catch (error) {
      console.error('Error fetching usage stats:', error);
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

      const newSource: WebsiteTrainingSourceInsert = {
        url,
        profile_id: user.id,
        status: 'pending',
        processed: false,
        word_count: 0
      };

      const { error } = await supabase
        .from('website_training_sources')
        .insert(newSource);

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

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Processing Status</h3>
        <WebTrainingList />
      </div>
    </section>
  );
};
