
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type BotSettings = Database['public']['Tables']['bot_settings']['Row'];
type Json = Database['public']['Tables']['bot_settings']['Row']['chat_settings'];

interface ChatSettings {
  maxMessagesPerChat: number;
  responseDelay: number;
  aiPersonality: string;
  fallbackMessage: string;
}

// Type guard to check if an object is a valid ChatSettings
function isChatSettings(obj: any): obj is ChatSettings {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'maxMessagesPerChat' in obj &&
    typeof obj.maxMessagesPerChat === 'number' &&
    'responseDelay' in obj &&
    typeof obj.responseDelay === 'number' &&
    'aiPersonality' in obj &&
    typeof obj.aiPersonality === 'string' &&
    'fallbackMessage' in obj &&
    typeof obj.fallbackMessage === 'string'
  );
}

export const ChatBehaviorSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maxMessagesPerChat: "50",
    responseDelay: "0",
    aiPersonality: "Friendly and helpful sleep advisor that specializes in luxury bedding and sleep solutions.",
    fallbackMessage: "I apologize, but I don't have enough information to answer that question. Could you please rephrase or ask something else about our luxury bedding products?",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('*')
        .single();

      if (error) throw error;
      
      if (data?.chat_settings && typeof data.chat_settings === 'object') {
        if (isChatSettings(data.chat_settings)) {
          setSettings({
            maxMessagesPerChat: data.chat_settings.maxMessagesPerChat.toString(),
            responseDelay: data.chat_settings.responseDelay.toString(),
            aiPersonality: data.chat_settings.aiPersonality,
            fallbackMessage: data.chat_settings.fallbackMessage,
          });
        } else {
          console.error('Invalid chat settings format:', data.chat_settings);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid chat settings format in database.",
          });
        }
      }
    } catch (error) {
      console.error('Error loading chat settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load chat behavior settings.",
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: existingSettings } = await supabase
        .from('bot_settings')
        .select('id')
        .single();

      if (!existingSettings?.id) {
        throw new Error('No settings record found');
      }

      // Create the settings object that matches the Json type
      const chatSettingsData = {
        maxMessagesPerChat: parseInt(settings.maxMessagesPerChat),
        responseDelay: parseInt(settings.responseDelay),
        aiPersonality: settings.aiPersonality,
        fallbackMessage: settings.fallbackMessage,
      } as unknown as Json;

      const { error } = await supabase
        .from('bot_settings')
        .update({
          chat_settings: chatSettingsData
        })
        .eq('id', existingSettings.id);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Chat behavior settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving chat settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save chat behavior settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chat Limits & Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="maxMessages" className="text-sm font-medium">
              Maximum Messages per Chat
            </label>
            <Input
              id="maxMessages"
              type="number"
              value={settings.maxMessagesPerChat}
              onChange={(e) => setSettings(prev => ({ ...prev, maxMessagesPerChat: e.target.value }))}
              min="1"
              max="100"
            />
            <p className="text-sm text-gray-500">
              Limit the number of messages in a single chat session
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="responseDelay" className="text-sm font-medium">
              Response Delay (ms)
            </label>
            <Input
              id="responseDelay"
              type="number"
              value={settings.responseDelay}
              onChange={(e) => setSettings(prev => ({ ...prev, responseDelay: e.target.value }))}
              min="0"
              max="2000"
            />
            <p className="text-sm text-gray-500">
              Add a slight delay before showing AI responses
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI Personality & Responses</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="aiPersonality" className="text-sm font-medium">
              AI Personality Description
            </label>
            <Textarea
              id="aiPersonality"
              value={settings.aiPersonality}
              onChange={(e) => setSettings(prev => ({ ...prev, aiPersonality: e.target.value }))}
              placeholder="Describe how the AI should behave and communicate"
              className="h-32"
            />
            <p className="text-sm text-gray-500">
              Define the AI's personality and communication style
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="fallbackMessage" className="text-sm font-medium">
              Fallback Message
            </label>
            <Textarea
              id="fallbackMessage"
              value={settings.fallbackMessage}
              onChange={(e) => setSettings(prev => ({ ...prev, fallbackMessage: e.target.value }))}
              placeholder="Default message when AI cannot provide a specific answer"
              className="h-24"
            />
            <p className="text-sm text-gray-500">
              Message shown when the AI cannot provide a specific answer
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
