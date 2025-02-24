
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
      className="flex items-center space-x-2"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Typ uw bericht..."
        className="flex-1 bg-white border-[#E5E7EB] rounded-full text-[15px] px-4 py-3 focus:ring-0 focus:border-[#E5E7EB] placeholder:text-gray-500"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-[#23262F] hover:bg-[#1E2026] rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
