
import { useState, useEffect } from "react";
import { BotSettings } from "@/components/BotSettings";
import { QuickActionsSettings } from "@/components/QuickActionsSettings";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const GeneralSettings = () => {
  const [uploading, setUploading] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentLogo();
  }, []);

  const fetchCurrentLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('logo_url')
        .single();
      
      if (error) throw error;
      setCurrentLogo(data?.logo_url);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `logo.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('brand_assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brand_assets')
        .getPublicUrl(filePath);

      // Update bot settings
      const { error: updateError } = await supabase
        .from('bot_settings')
        .upsert({ logo_url: publicUrl });

      if (updateError) throw updateError;

      setCurrentLogo(publicUrl);
      toast({
        title: "Success",
        description: "Logo updated successfully",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Bot Logo</h2>
        <p className="text-gray-600">Upload your bot's logo (SVG or PNG recommended)</p>
        
        <Card className="p-4">
          <div className="flex flex-col items-center gap-4">
            {currentLogo && (
              <img 
                src={currentLogo} 
                alt="Current Logo" 
                className="w-[70px] h-[70px] object-contain"
              />
            )}
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".svg,.png"
                onChange={handleLogoUpload}
                disabled={uploading}
                className="max-w-[300px]"
              />
              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Bot Name & Branding</h2>
        <p className="text-gray-600">Customize Archibot's appearance and initial settings.</p>
        <BotSettings />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Conversation Starters</h2>
        <p className="text-gray-600">Configure quick action buttons that appear at the start of each conversation.</p>
        <QuickActionsSettings />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Response Training</h2>
        <p className="text-gray-600">Upload training files to improve Archibot's knowledge.</p>
        <FileUpload />
      </section>
    </div>
  );
};
