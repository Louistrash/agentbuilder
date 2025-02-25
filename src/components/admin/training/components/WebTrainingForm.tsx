
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WebTrainingFormProps {
  onSuccess: () => void;
}

export const WebTrainingForm = ({ onSuccess }: WebTrainingFormProps) => {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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
          status: 'pending',
          processed: false,
          word_count: 0
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Website added to training queue. Processing will begin shortly.",
      });

      setUrl("");
      onSuccess();
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
  );
};
