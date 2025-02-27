import { useState, useEffect } from "react";
import { PlatformOverview } from "./platform/PlatformOverview";
import { AnalyticsOverview } from "./analytics/AnalyticsOverview";
import { ChatMetricsChart } from "./analytics/ChatMetricsChart";
import { TopQueriesTable } from "./analytics/TopQueriesTable";
import { ChatSection } from "./sections/ChatSection";
import { IntegrationsSection } from "./sections/IntegrationsSection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2 } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { Settings2 } from "lucide-react";

export const GeneralSettings = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [botSettingsId, setBotSettingsId] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

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

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      toast({
        title: "Access denied",
        description: "Only platform administrators can change the logo",
        variant: "destructive"
      });
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an SVG, PNG, or JPG file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 3MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      if (!botSettingsId) {
        throw new Error('Bot settings not found');
      }

      const { error: updateError } = await supabase
        .from('bot_settings')
        .update({ logo_url: publicUrl })
        .eq('id', botSettingsId);

      if (updateError) throw updateError;

      toast({
        title: "Logo updated",
        description: "Your logo has been successfully updated",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading logo",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderLogoUpload = () => {
    if (!isAdmin) return null;

    return (
      <div className="space-y-4 p-6 bg-[#161B22] rounded-xl border border-[#30363D]">
        <h3 className="text-lg font-semibold text-white">Platform Logo</h3>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="relative bg-[#0D1117] hover:bg-[#161B22] border-[#30363D]"
            disabled={isUploading}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".svg,.png,.jpg,.jpeg"
              onChange={handleLogoUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isUploading ? "Uploading..." : "Upload Logo"}
          </Button>
          <p className="text-sm text-gray-400">
            Upload your platform logo (SVG, PNG or JPG, max 3MB)
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-400">Overview of key metrics and performance indicators</p>
      </div>

      {renderLogoUpload()}

      <div className="grid gap-8">
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/10 via-[#1EAEDB]/5 to-[#EC4899]/10 opacity-50 group-hover:opacity-70 transition-all duration-300 blur-xl"></div>
          
          <div className="relative z-10 p-6 backdrop-blur-xl bg-[#161B22]/90 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 group-hover:border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1EAEDB]/20 to-[#1EAEDB]/5 flex items-center justify-center">
                <Settings2 className="h-5 w-5 text-[#1EAEDB]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Platform Overview</h3>
                <p className="text-sm text-white/60">System performance and metrics</p>
              </div>
            </div>
            <PlatformOverview />
          </div>
        </div>
        
        <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Analytics Overview</h3>
          <AnalyticsOverview />
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
            <div className="p-4 bg-[#0D1117]/80 backdrop-blur-sm rounded-xl border border-white/10">
              <ChatMetricsChart />
            </div>
            <div className="p-4 bg-[#0D1117]/80 backdrop-blur-sm rounded-xl border border-white/10">
              <TopQueriesTable />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6">Chat Settings</h3>
            <ChatSection />
          </div>
          
          <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6">Integrations</h3>
            <IntegrationsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
