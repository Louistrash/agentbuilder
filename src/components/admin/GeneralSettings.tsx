
import { useState } from "react";
import { DashboardGrid } from "./dashboard/DashboardGrid";
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

export const GeneralSettings = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      // Update bot settings with new logo URL
      const { error: updateError } = await supabase
        .from('bot_settings')
        .update({ logo_url: publicUrl })
        .eq('id', '1'); // Assuming there's only one bot settings record

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Overview of key metrics and performance indicators</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Platform Logo</h3>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="relative"
            disabled={isUploading}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
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
          <p className="text-sm text-muted-foreground">
            Upload your platform logo (max 2MB, PNG or JPG)
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <AnalyticsOverview />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChatMetricsChart />
        <TopQueriesTable />
      </div>

      <Separator className="my-8" />

      <div>
        <h3 className="text-lg sm:text-xl font-semibold">Application Settings</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">Configure your application behavior and integrations</p>
        
        <div className="space-y-12">
          <ChatSection />
          
          <Separator />
          
          <IntegrationsSection />
        </div>
      </div>
    </div>
  );
};
