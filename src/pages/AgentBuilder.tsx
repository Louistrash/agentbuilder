import React, { useState, useEffect } from 'react';
import { AgentsList } from "@/components/agent/AgentsList";
import { AdvancedConfig } from "@/components/agent/AdvancedConfig";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";
import { FeatureOnboarding } from "@/components/onboarding/FeatureOnboarding";
import { TutorialOverlay } from "@/components/onboarding/TutorialOverlay";
import { Header } from "@/components/agent/Header";
import { ProFeatures } from "@/components/agent/ProFeatures";
import { AgentTemplates } from "@/components/agent/AgentTemplates";
import { TokensCard } from "@/components/tokens/TokensCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Users, SendHorizontal, Lock, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Agent {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AgentBuilder() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  const fetchUserAvatar = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('avatar_url, updated_at')
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

  const handleCreateAgent = (template: { name: string; description: string; }) => {
    const newAgent: Agent = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      type: template.name.toLowerCase().replace(' ', '_')
    };
    setAgents(prev => [...prev, newAgent]);
    setSelectedAgent(newAgent);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage
    };

    setIsLoading(true);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...messages, userMessage],
          systemPrompt: `You are ${selectedAgent?.name}, ${selectedAgent?.description}. Be helpful and concise in your responses.`
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from the agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          <Header />
          
          {/* Avatar Upload */}
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
            <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
              <h2 className="text-lg font-semibold text-white">Your Chat Avatar</h2>
            </div>
            <div className="p-6">
              <AvatarUpload 
                currentAvatarUrl={avatarUrl || undefined}
                onAvatarUpdate={(url) => setAvatarUrl(url)}
              />
            </div>
          </div>

          {/* Agent Templates */}
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
            <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
              <h2 className="text-lg font-semibold text-white">Agent Templates</h2>
            </div>
            <div className="p-6">
              <AgentTemplates onCreateAgent={handleCreateAgent} />
            </div>
          </div>

          {/* Chat Demo */}
          {selectedAgent && (
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
              <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                <h2 className="text-lg font-semibold text-white">Chat Demo: {selectedAgent.name}</h2>
              </div>
              <div className="p-6">
                <div className="bg-[#1C2128] rounded-lg p-4 space-y-4">
                  <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                    <div className="flex items-start gap-3">
                      {avatarUrl ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={avatarUrl} />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#FEC6A1]/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#FEC6A1]" />
                        </div>
                      )}
                      <div className="flex-1 bg-[#30363D] rounded-lg p-3">
                        <p className="text-sm text-gray-300">Hi! I'm {selectedAgent.name}. How can I help you today?</p>
                      </div>
                    </div>
                    {messages.map((message, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {message.role === 'assistant' ? (
                          avatarUrl ? (
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={avatarUrl} />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#FEC6A1]/20 flex items-center justify-center">
                              <Users className="w-4 h-4 text-[#FEC6A1]" />
                            </div>
                          )
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-500" />
                          </div>
                        )}
                        <div className="flex-1 bg-[#30363D] rounded-lg p-3">
                          <p className="text-sm text-gray-300">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="animate-pulse">●</div>
                        <div className="animate-pulse animation-delay-200">●</div>
                        <div className="animate-pulse animation-delay-400">●</div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 bg-[#30363D] border border-[#454D58] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#FEC6A1]/50 disabled:opacity-50"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputMessage.trim()}
                      className="px-4 py-2 bg-[#FEC6A1]/20 text-[#FEC6A1] rounded-lg hover:bg-[#FEC6A1]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <SendHorizontal className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Agents List */}
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
            <div className="border-b border-[#30363D] bg-[#1C2128] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">Your Agents</h2>
                <button 
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEC6A1]/10 text-[#FEC6A1] hover:bg-[#FEC6A1]/20 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>{agents.length}</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <AgentsList agents={agents} />
            </div>
          </div>

          <ProFeatures />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Advanced Configuration */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden w-[60%]">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Advanced Configuration</h2>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#FEC6A1]" />
                      <span className="text-xs text-[#FEC6A1]">Pro</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-card">
                  <div className="filter blur-[2px] pointer-events-none">
                    <AdvancedConfig />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <div className="flex items-center gap-2">
                    {avatarUrl ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>
                          <Bot className="w-4 h-4 text-[#9B87F5]" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#9B87F5]/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-[#9B87F5]" />
                      </div>
                    )}
                    <h2 className="text-lg font-semibold text-white">Test Interface</h2>
                  </div>
                </div>
                <div className="p-6">
                  <TestInterface />
                </div>
              </div>

              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Widget Code</h2>
                </div>
                <div className="p-6">
                  <WidgetCode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#161B22] border border-[#30363D] text-white">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Chat with Agents</h3>
            <div className="space-y-4">
              {agents.map(agent => (
                <div 
                  key={agent.id}
                  className="p-4 rounded-lg bg-[#1C2128] border border-[#30363D] hover:border-[#FEC6A1]/50 cursor-pointer transition-all"
                >
                  <h4 className="font-medium">{agent.name}</h4>
                  <p className="text-sm text-gray-400">{agent.description}</p>
                </div>
              ))}
              {agents.length === 0 && (
                <p className="text-gray-400 text-center py-4">No agents created yet</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FeatureOnboarding />
      <TutorialOverlay />
    </div>
  );
}
