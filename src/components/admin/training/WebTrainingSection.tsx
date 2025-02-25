import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { WebTrainingForm } from "./components/WebTrainingForm";
import { UsageStats } from "./components/UsageStats";
import { WebTrainingList } from "./WebTrainingList";
interface UsageStats {
  totalWordsUsed: number;
  wordsLimit: number;
}
export const WebTrainingSection = () => {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const fetchUsageStats = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data: existingUsage
      } = await supabase.from('organization_usage').select().eq('profile_id', user.id).maybeSingle();
      if (!existingUsage) {
        await supabase.from('organization_usage').insert({
          profile_id: user.id,
          total_words_used: 0,
          words_limit: 100000
        });
      }
      const {
        data
      } = await supabase.from('organization_usage').select('total_words_used, words_limit').eq('profile_id', user.id).maybeSingle();
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
  useEffect(() => {
    fetchUsageStats();
  }, []);
  return <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-100">Web Training Sources</h2>
        <p className="text-sm text-zinc-400">
          Add website URLs to train the AI with your content. Only public pages will be processed.
        </p>
      </div>

      <WebTrainingForm onSuccess={fetchUsageStats} />

      {usage && <UsageStats totalWordsUsed={usage.totalWordsUsed} wordsLimit={usage.wordsLimit} />}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Processing Status</h3>
        <WebTrainingList />
      </div>
    </section>;
};