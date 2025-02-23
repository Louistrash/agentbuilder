
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

interface Message {
  content: string;
  isBot: boolean;
  role?: 'user' | 'assistant';
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        content:
          "Welcome to ArchiboldBeckers.nl and Bedroom.nl. I'm Archibot, your personal sleep consultant. How can I assist you today?",
        isBot: true,
        role: 'assistant'
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleSend = async (message: string) => {
    // Add user message
    const userMessage = { content: message, isBot: false, role: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const chatMessages = messages
        .filter(msg => msg.role) // Only include messages with roles
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
      setMessages((prev) => [
        ...prev,
        { content: botResponse, isBot: true, role: 'assistant' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      products:
        "Tell me about your luxury mattresses and the materials you use.",
      book: "I'd like to schedule a showroom visit. What are the available times?",
      sleep: "Can you give me some expert sleep tips?",
      contact:
        "What are your contact details and showroom location?",
    };

    handleSend(actionMessages[action]);
  };

  return (
    <div className="min-h-screen bg-luxury-50 p-4 flex items-center justify-center">
      <div className="chat-container relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
        <div className="messages-container">
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
        <QuickActions onActionClick={handleQuickAction} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Index;
