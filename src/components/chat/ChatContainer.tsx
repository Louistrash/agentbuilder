
import { useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";

interface ChatContainerProps {
  messages: Array<{ content: string; isBot: boolean }>;
  isTyping: boolean;
  onSend: (message: string) => void;
  onQuickAction: (action: string) => void;
}

export const ChatContainer = ({ messages, isTyping, onSend, onQuickAction }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="messages-container max-h-[60vh] overflow-y-auto p-4">
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
        <QuickActions onActionClick={onQuickAction} />
        <ChatInput onSend={onSend} />
      </div>
    </>
  );
};
