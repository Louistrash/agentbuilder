
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  content: string;
  isBot: boolean;
  role?: 'user' | 'assistant';
  type?: 'text' | 'image' | 'video' | 'voice';
  sentiment?: 'positive' | 'negative' | 'neutral';
  language?: string;
  mediaUrl?: string;
}

interface ChatSettings {
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
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [settings, setSettings] = useState<ChatSettings | null>(null);
  const { toast } = useToast();

  const logChatMessage = async (content: string, type: 'user' | 'bot', startTime?: number, messageType: Message['type'] = 'text') => {
    if (!sessionId) return;

    const messageData = {
      session_id: sessionId,
      message_type: type,
      content: content,
      media_type: messageType,
      ...(startTime && { response_time_ms: Date.now() - startTime })
    };

    const { error } = await supabase
      .from('chat_messages')
      .insert([messageData]);

    if (error) {
      console.error('Error logging chat message:', error);
    }

    if (type === 'user' && startTime) {
      const { error: queryError } = await supabase
        .rpc('upsert_chat_query', {
          p_query_text: content,
          p_response_time: Date.now() - startTime
        });

      if (queryError) {
        console.error('Error updating chat query:', queryError);
      }
    }
  };

  const loadChatSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('chat_settings')
        .single();

      if (error) throw error;

      if (data?.chat_settings) {
        setSettings(data.chat_settings as ChatSettings);
      }
    } catch (error) {
      console.error('Error loading chat settings:', error);
    }
  };

  const processVoiceInput = async (audioBlob: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const { data, error } = await supabase.functions.invoke('process-voice', {
        body: formData
      });

      if (error) throw error;

      return data.text;
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not process voice input. Please try again.",
      });
      throw error;
    }
  };

  const processImage = async (imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const { data, error } = await supabase.functions.invoke('process-image', {
        body: formData
      });

      if (error) throw error;

      return data.description;
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not process image. Please try again.",
      });
      throw error;
    }
  };

  const processVideo = async (videoFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const { data, error } = await supabase.functions.invoke('process-video', {
        body: formData
      });

      if (error) throw error;

      return data.description;
    } catch (error) {
      console.error('Error processing video:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not process video. Please try again.",
      });
      throw error;
    }
  };

  const translateMessage = async (text: string, targetLanguage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('translate', {
        body: { text, targetLanguage }
      });

      if (error) throw error;

      return data.translatedText;
    } catch (error) {
      console.error('Error translating message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not translate message. Please try again.",
      });
      throw error;
    }
  };

  const sendMessage = async (message: string | File, type: Message['type'] = 'text', language?: string) => {
    const startTime = Date.now();
    let processedContent = '';
    let mediaUrl = '';

    try {
      // Process different types of input
      if (type === 'voice' && message instanceof Blob) {
        processedContent = await processVoiceInput(message);
      } else if (type === 'image' && message instanceof File) {
        processedContent = await processImage(message);
        mediaUrl = URL.createObjectURL(message);
      } else if (type === 'video' && message instanceof File) {
        processedContent = await processVideo(message);
        mediaUrl = URL.createObjectURL(message);
      } else {
        processedContent = message as string;
      }

      // Translate if needed
      if (language && language !== settings?.voiceSettings.language) {
        processedContent = await translateMessage(processedContent, settings?.voiceSettings.language || 'en-US');
      }

      const userMessage = { 
        content: processedContent, 
        isBot: false, 
        role: 'user' as const,
        type,
        language,
        mediaUrl
      };

      setMessages((prev) => [...prev, userMessage]);
      await logChatMessage(processedContent, 'user', startTime, type);
      
      setIsTyping(true);

      const chatMessages = messages
        .filter(msg => msg.role)
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: chatMessages }
      });

      if (error) throw error;

      const botResponse = data.choices[0].message.content;
      
      await logChatMessage(botResponse, 'bot', startTime);
      
      setMessages((prev) => [
        ...prev,
        { content: botResponse, isBot: true, role: 'assistant', type: 'text' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get a response from the AI. Please try again.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const initializeChat = async (userId?: string) => {
    await loadChatSettings();
    
    const { data: session, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          visitor_id: userId || 'anonymous',
          platform: 'web',
          device_type: /mobile|android|ios/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat session:', error);
      return;
    }

    setSessionId(session.id);

    const welcomeMessage = {
      content: "Hello, I'm Archibot, your personal sleep advisor. I can help you find the perfect mattress or answer questions about healthy sleep. I can understand voice, images, and videos too! How may I assist you today?",
      isBot: true,
      role: 'assistant' as const,
      type: 'text'
    };
    
    setMessages([welcomeMessage]);

    await supabase.from('chat_messages').insert([
      {
        session_id: session.id,
        message_type: 'bot',
        content: welcomeMessage.content
      }
    ]);
  };

  const endSession = async () => {
    if (sessionId) {
      await supabase
        .from('chat_sessions')
        .update({ ended_at: new Date().toISOString() })
        .eq('id', sessionId);
    }
  };

  return {
    messages,
    isTyping,
    sessionId,
    settings,
    sendMessage,
    initializeChat,
    endSession
  };
};
