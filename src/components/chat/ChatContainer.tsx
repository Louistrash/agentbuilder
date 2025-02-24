
import { useRef, useEffect, useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Share } from "lucide-react";
import { format } from "date-fns";

interface ChatContainerProps {
  messages: Array<{
    content: string;
    isBot: boolean;
  }>;
  isTyping: boolean;
  onSend: (message: string) => void;
  onQuickAction: (action: string) => void;
}

export const ChatContainer = ({
  messages,
  isTyping,
  onSend,
  onQuickAction
}: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const headerRef = useRef<HTMLDivElement>(null);
  
  const {
    sendMessage,
    isLoading
  } = useWhatsApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
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
    <div className="chat-container relative h-screen flex flex-col">
      <div 
        ref={headerRef}
        className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 md:hidden"
      >
        <div className="px-4 py-3 flex">
          <span className="text-gray-500 text-sm font-medium ml-2">
            {format(currentTime, 'h:mm a')}
          </span>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto md:my-[139px] md:mx-[21px] my-[20px] mx-[12px]"
      >
        {messages.map((message, index) => (
          <div key={index} className="flex items-start gap-2 group">
            <ChatMessage content={message.content} isBot={message.isBot} />
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
        <div ref={messagesEndRef} className="h-[180px] md:h-[200px]" />
      </div>

      <div className="sticky bottom-0 z-10 bg-[#E5DDD5]">
        <div className="max-w-[1550px] w-full mx-auto px-2 md:px-4">
          <div className="chat-input-container rounded-xl mb-3 md:mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg py-4 md:py-6 px-3 md:px-6">
            <div className="chat-input-wrapper space-y-3 md:space-y-4">
              <div className="overflow-x-auto pb-1 md:pb-2">
                <QuickActions onActionClick={onQuickAction} />
              </div>
              <div className="px-2 md:px-4">
                <ChatInput onSend={onSend} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
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
                onChange={e => setPhoneNumber(e.target.value)} 
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
