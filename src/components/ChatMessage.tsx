
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
}

export const ChatMessage = ({ content, isBot }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg max-w-[85%] text-sm",
        isBot
          ? "bg-white text-[#18344A]/60 self-start" // Changed opacity to 60% (40% lower)
          : "bg-[#18344A] text-white self-end"
      )}
    >
      {content}
    </div>
  );
};
