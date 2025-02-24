import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
interface ChatMessageProps {
  content: string;
  isBot?: boolean;
}
export const ChatMessage = ({
  content,
  isBot = false
}: ChatMessageProps) => {
  const [isVisible] = useState(true);
  return <div className="px-[3px] mx-0 my-0">
      {isBot && <Avatar className="w-8 h-8 border-2 border-luxury-100">
          <div className="w-full h-full bg-luxury-100 flex items-center justify-center text-luxury-900 text-xs font-medium">
            AB
          </div>
        </Avatar>}
      <div className="mx-[5px] my-[22px]">
        {content}
      </div>
    </div>;
};