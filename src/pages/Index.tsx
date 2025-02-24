
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Settings } from "lucide-react";

interface Message {
  content: string;
  isBot: boolean;
  role?: 'user' | 'assistant';
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initializeChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(!!profile?.is_admin);
      }

      // Create new chat session
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .insert([
          {
            visitor_id: user?.id || 'anonymous',
            platform: 'web',
            device_type: /mobile|android|ios/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating chat session:', error);
      } else {
        setSessionId(session.id);
      }

      // Initial welcome message
      const welcomeMessage = {
        content: "Welkom bij ArchiboldBeckers.nl en Bedroom.nl. Ik ben Archibot, uw persoonlijke slaapadviseur. Hoe kan ik u vandaag helpen?",
        isBot: true,
        role: 'assistant' as const
      };
      
      setMessages([welcomeMessage]);

      // Log welcome message
      if (session?.id) {
        await supabase.from('chat_messages').insert([
          {
            session_id: session.id,
            message_type: 'bot',
            content: welcomeMessage.content
          }
        ]);
      }
    };

    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = async () => {
    // End chat session if exists
    if (sessionId) {
      await supabase
        .from('chat_sessions')
        .update({ ended_at: new Date().toISOString() })
        .eq('id', sessionId);
    }

    await supabase.auth.signOut();
    navigate('/auth');
  };

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

    // Update chat_queries for user messages
    if (type === 'user') {
      const { error: queryError } = await supabase
        .rpc('upsert_chat_query', { 
          p_query_text: content,
          p_response_time: messageData.response_time_ms || 0
        });

      if (queryError) {
        console.error('Error updating chat query:', queryError);
      }
    }
  };

  const handleSend = async (message: string) => {
    const startTime = Date.now();
    
    // Add user message
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
      
      // Log bot message
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

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      products: "Vertel me over uw luxe matrassen en de materialen die u gebruikt.",
      book: "Ik wil graag een showroom bezoek inplannen. Wat zijn de beschikbare tijden?",
      sleep: "Kunt u mij expert slaaptips geven?",
      contact: "Wat zijn uw contactgegevens en de locatie van de showroom?",
    };

    handleSend(actionMessages[action]);
  };

  return (
    <div className="min-h-screen bg-luxury-50 p-4 flex items-center justify-center">
      <div className="chat-container relative bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
              className="text-luxury-600 hover:text-luxury-800"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <div className="messages-container max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              isBot={message.isBot}
            />
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span style={{ animationDelay: "0.2s" }}></span>
              <span style={{ animationDelay: "0.4s" }}></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-luxury-100">
          <QuickActions onActionClick={handleQuickAction} />
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default Index;
