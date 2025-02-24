
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
        "px-4 py-2 rounded-2xl break-words text-left w-[95%]",
        isBot 
          ? "bg-white text-gray-800" 
          : "bg-[#D3E4FD] text-gray-800 shadow-sm transition-all duration-200" +
            " hover:shadow-md" +
            " bg-gradient-to-br from-[#D3E4FD] to-[#E8F0FD]" +
            " border border-white/20"
      )}>
        {content.match(/.{1,24}(\s|$)/g)?.join('\n') || content}
      </div>
    </div>
  );
};
