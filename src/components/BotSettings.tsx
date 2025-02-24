
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image, Save } from "lucide-react";

interface BotSettings {
  id: string;
  bot_name: string;
  logo_url: string | null;
  welcome_message: string;
}

export const BotSettings = () => {
  const [settings, setSettings] = useState<BotSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('bot_settings')
      .select('*')
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load bot settings.",
      });
      return;
    }

    setSettings(data);
  };

  const handleSave = async () => {
    if (!settings?.id) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('bot_settings')
      .update({
        bot_name: settings.bot_name,
        logo_url: settings.logo_url,
        welcome_message: settings.welcome_message,
      })
      .eq('id', settings.id);

    setIsLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save settings.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Bot settings saved successfully.",
    });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image file.",
      });
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Image must be smaller than 2MB.",
      });
      return;
    }

    setIsLoading(true);
    const fileName = `${crypto.randomUUID()}-${file.name}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('bot-assets')
      .upload(fileName, file);

    if (uploadError) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not upload image.",
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('bot-assets')
      .getPublicUrl(fileName);

    setSettings(prev => prev ? { ...prev, logo_url: publicUrl } : null);
    setIsLoading(false);
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="botName" className="text-sm font-medium text-gray-700">
            Bot Name
          </label>
          <Input
            id="botName"
            value={settings.bot_name}
            onChange={(e) => setSettings({ ...settings, bot_name: e.target.value })}
            placeholder="Enter bot name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="welcomeMessage" className="text-sm font-medium text-gray-700">
            Welcome Message
          </label>
          <Textarea
            id="welcomeMessage"
            value={settings.welcome_message}
            onChange={(e) => setSettings({ ...settings, welcome_message: e.target.value })}
            placeholder="Enter welcome message"
            className="min-h-[100px] resize-y"
          />
          <p className="text-sm text-gray-500">
            This message will be shown to users when they first start a conversation.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Logo
          </label>
          <div className="flex items-center gap-4">
            {settings.logo_url && (
              <img
                src={settings.logo_url}
                alt="Bot logo"
                className="h-12 w-12 object-contain rounded border border-gray-200"
              />
            )}
            <div className="flex-1">
              <Button
                variant="outline"
                onClick={() => document.getElementById('logo-upload')?.click()}
                className="w-full"
              >
                <Image className="h-4 w-4 mr-2" />
                {settings.logo_url ? 'Change Logo' : 'Upload Logo'}
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};
