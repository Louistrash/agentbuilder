
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "./settings/DashboardHeader";
import { LogoUpload } from "./settings/LogoUpload";
import { PlatformSection } from "./settings/PlatformSection";
import { AnalyticsOverviewSection } from "./settings/AnalyticsOverviewSection";
import { SettingsSections } from "./settings/SettingsSections";

export const GeneralSettings = () => {
  const [botSettingsId, setBotSettingsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBotSettings = async () => {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('id')
        .single();

      if (error) {
        console.error('Error fetching bot settings:', error);
        return;
      }

      if (data) {
        setBotSettingsId(data.id);
      }
    };

    fetchBotSettings();
  }, []);

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <LogoUpload botSettingsId={botSettingsId} />

      <div className="grid gap-8">
        <PlatformSection />
        <AnalyticsOverviewSection />
        <SettingsSections />
      </div>
    </div>
  );
};
