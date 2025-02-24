
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
        "px-3 py-2 rounded-2xl max-w-[75%] break-words text-left",
        isBot ? "bg-white text-gray-800" : "bg-[#DCF8C6] text-gray-800"
      )}>
        {content}
      </div>
    </div>
  );
};
