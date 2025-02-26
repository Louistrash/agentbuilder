
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";

export function TestInterface() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a simulated response from the AI agent. In production, this would be connected to your AI model.' 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div 
              key={i}
              className={`p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-[#9B87F5]/10 ml-8 border border-[#9B87F5]/20' 
                  : 'bg-[#1C2128] mr-8 border border-[#30363D]'
              }`}
            >
              <p className="text-sm text-white">{message.content}</p>
            </div>
          ))}
          {isTyping && (
            <div className="bg-[#1C2128] mr-8 p-3 rounded-lg border border-[#30363D]">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#9B87F5]" />
                <span className="text-sm text-gray-400">AI is typing...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Test your agent..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="bg-[#1C2128] border-[#30363D]"
        />
        <Button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="bg-[#9B87F5] hover:bg-[#9B87F5]/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
