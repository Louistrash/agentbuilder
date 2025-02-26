
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestInterface() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  const fetchUserAvatar = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    } catch (error) {
      console.error('Error fetching user avatar:', error);
    }
  };

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
              className="flex items-start gap-3"
            >
              {message.role === 'assistant' ? (
                avatarUrl ? (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#9B87F5]/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#9B87F5]" />
                  </div>
                )
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1C2128] border border-[#30363D] flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
              )}
              <div className={`flex-1 p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-[#9B87F5]/10 border border-[#9B87F5]/20' 
                  : 'bg-[#1C2128] border border-[#30363D]'
              }`}>
                <p className="text-sm text-white">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-3">
              {avatarUrl ? (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#9B87F5]/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#9B87F5]" />
                </div>
              )}
              <div className="bg-[#1C2128] border border-[#30363D] p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#9B87F5]" />
                  <span className="text-sm text-gray-400">AI is typing...</span>
                </div>
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
