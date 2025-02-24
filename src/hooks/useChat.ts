
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  content: string;
  isBot: boolean;
  role?: 'user' | 'assistant';
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { toast } = useToast();

  const logChatMessage = async (content: string, type: 'user' | 'bot', startTime?: number) => {
    if (!sessionId) return;

    const messageData = {
      session_id: sessionId,
      message_type: type,
      content: content,
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

  const sendMessage = async (message: string) => {
    const startTime = Date.now();
    
    const userMessage = { content: message, isBot: false, role: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);
    await logChatMessage(message, 'user');
    
    setIsTyping(true);

    try {
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
        { content: botResponse, isBot: true, role: 'assistant' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Fout",
        description: "Kon geen antwoord krijgen van de AI. Probeer het opnieuw.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const initializeChat = async (userId?: string) => {
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
      content: "Hallo, ik ben Archibot, uw persoonlijke slaapadviseur. Ik help u graag met het vinden van de perfecte matras of het beantwoorden van vragen over een gezonde nachtrust. Waarmee kan ik u van dienst zijn?",
      isBot: true,
      role: 'assistant' as const
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
    sendMessage,
    initializeChat,
    endSession
  };
};
