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
  const {
    sendMessage,
    isLoading
  } = useWhatsApp();
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
  return <div className="chat-container relative h-screen flex flex-col">
      <div className="absolute inset-0 overflow-y-auto my-[139px] mx-[21px]">
        {messages.map((message, index) => <div key={index} className="flex items-start gap-2 group">
            <ChatMessage content={message.content} isBot={message.isBot} />
            {!message.isBot && <Button variant="ghost" size="icon" className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" onClick={() => {
          setSelectedMessage(message.content);
          setIsShareDialogOpen(true);
        }}>
                <Share className="h-4 w-4" />
              </Button>}
          </div>)}
        {isTyping && <div className="typing-indicator">
            <span></span>
            <span style={{
          animationDelay: "0.2s"
        }}></span>
            <span style={{
          animationDelay: "0.4s"
        }}></span>
          </div>}
        <div ref={messagesEndRef} className="h-[200px]" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-3xl mx-[240px] px-0 py-0">
          <div className="chat-input-container rounded-xl mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg w-[calc(100%-24px)] mx-[16px] my-[20px] py-[24px] px-0">
            <div className="chat-input-wrapper space-y-4">
              <div className="overflow-x-auto pb-2">
                <QuickActions onActionClick={onQuickAction} />
              </div>
              <div className="px-4">
                <ChatInput onSend={onSend} />
              </div>
            </div>
          </div>
        </div>
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
              <Input id="phoneNumber" placeholder="Enter phone number with country code (e.g., +31612345678)" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <p className="mt-1 text-sm text-muted-foreground">{selectedMessage}</p>
            </div>
            <Button onClick={handleShareViaWhatsApp} disabled={!phoneNumber || isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};