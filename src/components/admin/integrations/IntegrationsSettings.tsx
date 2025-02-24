
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, MessageSquare, Instagram, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const IntegrationsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappToken, setWhatsappToken] = useState("");
  const [messengerToken, setMessengerToken] = useState("");
  const [instagramToken, setInstagramToken] = useState("");
  const { toast } = useToast();

  const handleTestConnection = async (platform: string, token: string) => {
    setIsLoading(true);
    
    try {
      // In a real implementation, you would verify the token with the respective platform's API
      console.log(`Testing ${platform} connection with token:`, token);
      
      toast({
        title: "Connection Test",
        description: `${platform} connection test initiated. Please check your platform's dashboard to confirm.`,
      });
    } catch (error) {
      console.error(`Error testing ${platform} connection:`, error);
      toast({
        title: "Error",
        description: `Failed to test ${platform} connection. Please check your credentials and try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Integration
            </CardTitle>
            <CardDescription>
              Connect your WhatsApp Business account to interact with customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleTestConnection("WhatsApp", whatsappToken);
            }} className="space-y-4">
              <div>
                <label htmlFor="whatsappToken" className="text-sm font-medium">
                  WhatsApp Business Token
                </label>
                <Input
                  id="whatsappToken"
                  placeholder="Enter your WhatsApp Business API token"
                  value={whatsappToken}
                  onChange={(e) => setWhatsappToken(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Get this from your WhatsApp Business Platform dashboard
                </p>
              </div>
              <Button type="submit" disabled={isLoading || !whatsappToken}>
                {isLoading ? "Testing..." : "Test Connection"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Facebook Messenger
            </CardTitle>
            <CardDescription>
              Integrate with Facebook Messenger for customer communication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleTestConnection("Messenger", messengerToken);
            }} className="space-y-4">
              <div>
                <label htmlFor="messengerToken" className="text-sm font-medium">
                  Messenger Access Token
                </label>
                <Input
                  id="messengerToken"
                  placeholder="Enter your Facebook Messenger token"
                  value={messengerToken}
                  onChange={(e) => setMessengerToken(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Found in your Facebook Developer Console
                </p>
              </div>
              <Button type="submit" disabled={isLoading || !messengerToken}>
                {isLoading ? "Testing..." : "Test Connection"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              Instagram Integration
            </CardTitle>
            <CardDescription>
              Connect with Instagram Direct Messages for customer support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleTestConnection("Instagram", instagramToken);
            }} className="space-y-4">
              <div>
                <label htmlFor="instagramToken" className="text-sm font-medium">
                  Instagram Access Token
                </label>
                <Input
                  id="instagramToken"
                  placeholder="Enter your Instagram API token"
                  value={instagramToken}
                  onChange={(e) => setInstagramToken(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Available in your Instagram Business settings
                </p>
              </div>
              <Button type="submit" disabled={isLoading || !instagramToken}>
                {isLoading ? "Testing..." : "Test Connection"}
              </Button>
            </form>
          </CardContent>
        </Card>

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
