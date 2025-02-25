
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WhatsAppIntegration } from "./components/WhatsAppIntegration";
import { MessengerIntegration } from "./components/MessengerIntegration";
import { InstagramIntegration } from "./components/InstagramIntegration";

interface IntegrationSettings {
  id: string;
  platform: string;
  api_token: string | null;
  settings: any;
  is_active: boolean;
}

export const IntegrationsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappToken, setWhatsappToken] = useState("");
  const [messengerToken, setMessengerToken] = useState("");
  const [instagramToken, setInstagramToken] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchIntegrationSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('integration_settings')
          .select('*');

        if (error) throw error;

        if (data) {
          const whatsappSettings = data.find(setting => setting.platform === 'whatsapp');
          const messengerSettings = data.find(setting => setting.platform === 'messenger');
          const instagramSettings = data.find(setting => setting.platform === 'instagram');

          if (whatsappSettings?.api_token) setWhatsappToken(whatsappSettings.api_token);
          if (messengerSettings?.api_token) setMessengerToken(messengerSettings.api_token);
          if (instagramSettings?.api_token) setInstagramToken(instagramSettings.api_token);
        }
      } catch (error) {
        console.error('Error fetching integration settings:', error);
        toast({
          title: "Error",
          description: "Failed to load integration settings",
          variant: "destructive",
        });
      }
    };

    fetchIntegrationSettings();
  }, [toast]);

  const handleTestConnection = async (platform: string, token: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('integration_settings')
        .upsert({
          platform: platform.toLowerCase(),
          api_token: token,
          is_active: true,
          settings: {}
        }, {
          onConflict: 'platform'
        });

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: `${platform} integration settings have been saved successfully.`,
      });
    } catch (error) {
      console.error(`Error saving ${platform} settings:`, error);
      toast({
        title: "Error",
        description: `Failed to save ${platform} settings. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WhatsAppIntegration
          token={whatsappToken}
          onTokenChange={setWhatsappToken}
          onSubmit={() => handleTestConnection("WhatsApp", whatsappToken)}
          isLoading={isLoading}
        />

        <MessengerIntegration
          token={messengerToken}
          onTokenChange={setMessengerToken}
          onSubmit={() => handleTestConnection("Messenger", messengerToken)}
          isLoading={isLoading}
        />

        <InstagramIntegration
          token={instagramToken}
          onTokenChange={setInstagramToken}
          onSubmit={() => handleTestConnection("Instagram", instagramToken)}
          isLoading={isLoading}
        />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Additional Integrations
            </CardTitle>
            <CardDescription>
              Configure other third-party integrations and APIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              More integration options coming soon. This will allow you to connect with various other messaging and communication platforms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
