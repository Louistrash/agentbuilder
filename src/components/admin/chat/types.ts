
import { Database } from "@/integrations/supabase/types";

export type BotSettings = Database['public']['Tables']['bot_settings']['Row'];
export type Json = Database['public']['Tables']['bot_settings']['Row']['chat_settings'];

export interface ChatSettings {
  maxMessagesPerChat: number;
  responseDelay: number;
  aiPersonality: string;
  fallbackMessage: string;
  reasoningLevel: 'basic' | 'advanced' | 'expert';
  emotionalIntelligence: boolean;
  contextMemory: {
    enabled: boolean;
    messageHistory: number;
  };
  multimodalSupport: {
    images: boolean;
    voice: boolean;
    video: boolean;
  };
  voiceSettings: {
    enabled: boolean;
    language: string;
    voice: string;
  };
  learningMode: {
    enabled: boolean;
    adaptationRate: number;
  };
}

// Type guard to check if an object is a valid ChatSettings
export function isChatSettings(obj: any): obj is ChatSettings {
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
    typeof obj.fallbackMessage === 'string' &&
    'reasoningLevel' in obj &&
    'emotionalIntelligence' in obj &&
    'contextMemory' in obj &&
    'multimodalSupport' in obj &&
    'voiceSettings' in obj &&
    'learningMode' in obj
  );
}
