
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ChatSettings, Json, isChatSettings } from "./admin/chat/types";
import { ChatLimitsSection } from "./admin/chat/ChatLimitsSection";
import { AIPersonalitySection } from "./admin/chat/AIPersonalitySection";
import { MultimodalSection } from "./admin/chat/MultimodalSection";

export const ChatBehaviorSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maxMessagesPerChat: "50",
    responseDelay: "0",
    aiPersonality: "Friendly and helpful sleep advisor that specializes in luxury bedding and sleep solutions.",
    fallbackMessage: "I apologize, but I don't have enough information to answer that question. Could you please rephrase or ask something else about our luxury bedding products?",
    reasoningLevel: "advanced",
    emotionalIntelligence: true,
    contextMemory: {
      enabled: true,
      messageHistory: 10
    },
    learningMode: {
      enabled: true,
      adaptationRate: 0.5
    },
    multimodalSupport: {
      images: false,
      voice: false,
      video: false
    },
    voiceSettings: {
      enabled: false,
      language: "en-US",
      voice: "natural"
    }
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
            reasoningLevel: data.chat_settings.reasoningLevel || "advanced",
            emotionalIntelligence: data.chat_settings.emotionalIntelligence ?? true,
            contextMemory: data.chat_settings.contextMemory || {
              enabled: true,
              messageHistory: 10
            },
            learningMode: data.chat_settings.learningMode || {
              enabled: true,
              adaptationRate: 0.5
            },
            multimodalSupport: data.chat_settings.multimodalSupport || {
              images: false,
              voice: false,
              video: false
            },
            voiceSettings: data.chat_settings.voiceSettings || {
              enabled: false,
              language: "en-US",
              voice: "natural"
            }
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

      const chatSettingsData = {
        maxMessagesPerChat: parseInt(settings.maxMessagesPerChat),
        responseDelay: parseInt(settings.responseDelay),
        aiPersonality: settings.aiPersonality,
        fallbackMessage: settings.fallbackMessage,
        reasoningLevel: settings.reasoningLevel,
        emotionalIntelligence: settings.emotionalIntelligence,
        contextMemory: settings.contextMemory,
        learningMode: settings.learningMode,
        multimodalSupport: settings.multimodalSupport,
        voiceSettings: settings.voiceSettings,
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

  const handleSettingChange = (key: string, value: string | number | boolean | object) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChatLimitsSection
          maxMessagesPerChat={settings.maxMessagesPerChat}
          responseDelay={settings.responseDelay}
          contextMemory={settings.contextMemory}
          learningMode={settings.learningMode}
          onSettingChange={handleSettingChange}
        />

        <AIPersonalitySection
          aiPersonality={settings.aiPersonality}
          fallbackMessage={settings.fallbackMessage}
          reasoningLevel={settings.reasoningLevel}
          emotionalIntelligence={settings.emotionalIntelligence}
          onSettingChange={handleSettingChange}
        />
      </div>

      <MultimodalSection
        multimodalSupport={settings.multimodalSupport}
        voiceSettings={settings.voiceSettings}
        onSettingChange={handleSettingChange}
      />

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
