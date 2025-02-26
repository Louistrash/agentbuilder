
import React, { useState } from 'react';
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
import { Users } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  description: string;
  type: string;
}

export default function AgentBuilder() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleCreateAgent = (template: { name: string; description: string; }) => {
    const newAgent: Agent = {
      id: Date.now(),
      name: template.name,
      description: template.description,
      type: template.name.toLowerCase().replace(' ', '_')
    };
    setAgents(prev => [...prev, newAgent]);
    setSelectedAgent(newAgent);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          <Header />
          
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
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FEC6A1]/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#FEC6A1]" />
                      </div>
                      <div className="flex-1 bg-[#30363D] rounded-lg p-3">
                        <p className="text-sm text-gray-300">Hi! I'm {selectedAgent.name}. How can I help you today?</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-[#30363D] border border-[#454D58] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#FEC6A1]/50"
                    />
                    <button className="px-4 py-2 bg-[#FEC6A1]/20 text-[#FEC6A1] rounded-lg hover:bg-[#FEC6A1]/30 transition-colors">
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
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Advanced Configuration</h2>
                </div>
                <div className="p-6">
                  <AdvancedConfig />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Test Interface</h2>
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
