
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 p-4 border-t border-luxury-100"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-luxury-50 border-luxury-200 focus:ring-luxury-300 focus:border-luxury-300"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-luxury-900 hover:bg-luxury-800"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
