
import { useRef, useEffect, useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Share } from "lucide-react";

interface ChatContainerProps {
  messages: Array<{ content: string; isBot: boolean }>;
  isTyping: boolean;
  onSend: (message: string) => void;
  onQuickAction: (action: string) => void;
}

export const ChatContainer = ({ messages, isTyping, onSend, onQuickAction }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const { sendMessage, isLoading } = useWhatsApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleShareViaWhatsApp = async () => {
    try {
      await sendMessage(phoneNumber, selectedMessage);
      setIsShareDialogOpen(false);
      setPhoneNumber("");
    } catch (error) {
      console.error('Failed to share via WhatsApp:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start gap-2 group">
            <ChatMessage
              content={message.content}
              isBot={message.isBot}
            />
            {!message.isBot && (
              <Button
                variant="ghost"
                size="icon"
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  setSelectedMessage(message.content);
                  setIsShareDialogOpen(true);
                }}
              >
                <Share className="h-4 w-4" />
              </Button>
            )}
          </div>
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
      <div className="border-t border-luxury-100 bg-white/80 backdrop-blur-sm sticky bottom-0 left-0 right-0">
        <QuickActions onActionClick={onQuickAction} />
        <ChatInput onSend={onSend} />
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share via WhatsApp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                placeholder="Enter phone number with country code (e.g., +31612345678)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <p className="mt-1 text-sm text-muted-foreground">{selectedMessage}</p>
            </div>
            <Button 
              onClick={handleShareViaWhatsApp}
              disabled={!phoneNumber || isLoading}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
