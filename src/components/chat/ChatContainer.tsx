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
  return;
};