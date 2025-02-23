
import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { useToast } from "@/hooks/use-toast";

interface Message {
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content: message, isBot: false }]);
    setIsTyping(true);

    // Simulate bot response (replace with actual API call later)
    setTimeout(() => {
      const response = generateResponse(message);
      setMessages((prev) => [...prev, { content: response, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      products:
        "Our luxury mattresses are handcrafted using the finest natural materials, including horsehair, vicuña wool, cashmere, and silk. Would you like to learn more about a specific product?",
      book: "I'd be happy to help you schedule a showroom visit. When would you like to come in?",
      sleep: "Here are some expert sleep tips: 1. Maintain a consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Ensure your bedroom is cool and dark\n4. Invest in quality bedding\n\nWould you like more specific advice?",
      contact:
        "You can reach us at our showroom:\nAddress: [Showroom Address]\nPhone: [Phone Number]\nEmail: [Email]\n\nWould you like me to help you schedule a visit?",
    };

    handleSend(action);
  };

  const generateResponse = (message: string): string => {
    // Simple response logic (replace with actual AI implementation)
    const lowercaseMessage = message.toLowerCase();
    if (lowercaseMessage.includes("price")) {
      return "Our luxury mattresses are custom-made to your specifications. Prices vary based on size and materials. Would you like to schedule a consultation to discuss your specific needs?";
    }
    if (lowercaseMessage.includes("material")) {
      return "We use only the finest natural materials in our mattresses, including:\n- Premium horsehair\n- Vicuña wool\n- Pure cashmere\n- Natural silk\n- Calico pocket springs\n\nWould you like to learn more about any specific material?";
    }
    if (lowercaseMessage.includes("delivery")) {
      return "We offer white-glove delivery service for all our mattresses. Our team will personally deliver and set up your new mattress, ensuring everything is perfect. Would you like to know more about our delivery process?";
    }
    return "I understand you're interested in learning more. Could you please specify what aspect of our luxury mattresses you'd like to know about?";
  };

  return (
    <div className="min-h-screen bg-luxury-50 p-4 flex items-center justify-center">
      <div className="chat-container">
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
