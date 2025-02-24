
import { Database } from "@/integrations/supabase/types";

export type BotSettings = Database['public']['Tables']['bot_settings']['Row'];
export type Json = Database['public']['Tables']['bot_settings']['Row']['chat_settings'];

export interface ChatSettings {
  maxMessagesPerChat: number;
  responseDelay: number;
  aiPersonality: string;
  fallbackMessage: string;
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
    typeof obj.fallbackMessage === 'string'
  );
}
