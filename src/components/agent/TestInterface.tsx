
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TestInterface() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a simulated response from the AI agent.' 
      }]);
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
                  ? 'bg-purple-500/10 ml-8' 
                  : 'bg-[#1C2128] mr-8'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
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
        <Button onClick={handleSend} size="sm">
          Send
        </Button>
      </div>
    </div>
  );
}
