
import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isBot?: boolean;
}

export const ChatMessage = ({ content, isBot = false }: ChatMessageProps) => {
  const [isVisible] = useState(true);

  return (
    <div className={cn(
      "flex items-start gap-2 px-2 py-1",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <Avatar className="w-8 h-8 border-2 border-luxury-100">
          <div className="w-full h-full bg-luxury-100 flex items-center justify-center text-luxury-900 text-xs font-medium">
            AB
          </div>
        </Avatar>
      )}
      <div className={cn(
        "px-4 py-2.5 rounded-2xl max-w-[75%] break-words text-left",
        isBot 
          ? "bg-white text-gray-800" 
          : "bg-[#18344A] text-white shadow-sm transition-all duration-200" +
            " hover:shadow-md" +
            " bg-gradient-to-br from-[#18344A] to-[#1F4565]" +
            " border border-white/10"
      )}>
        {content}
      </div>
    </div>
  );
};
