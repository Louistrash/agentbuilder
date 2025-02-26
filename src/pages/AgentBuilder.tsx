
import React, { useState, useEffect } from 'react';
import { Bot } from "lucide-react";
import { AgentsList } from "@/components/agent/AgentsList";
import { AgentTemplates } from "@/components/agent/AgentTemplates";
import { AdvancedConfig } from "@/components/agent/AdvancedConfig";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";
import { FeatureOnboarding } from "@/components/onboarding/FeatureOnboarding";
import { TutorialOverlay } from "@/components/onboarding/TutorialOverlay";

export default function AgentBuilder() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);

  useEffect(() => {
    // Fetch agents from API or database
    const fetchAgents = async () => {
      // Example data
      const mockAgents = [
        {
          id: 1,
          name: 'Sales Agent',
          description: 'Automates sales tasks'
        },
        {
          id: 2,
          name: 'Support Agent',
          description: 'Handles customer support'
        }
      ];
      setAgents(mockAgents);
    };
    fetchAgents();
  }, []);

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setIsConfiguring(true);
  };

  const handleAgentSave = (agentConfig) => {
    // Save agent configuration to API or database
    console.log('Agent configuration saved:', agentConfig);
    setIsConfiguring(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#1EAEDB]/10">
                <Bot className="w-5 h-5 text-[#1EAEDB]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Agent Builder</h1>
                <p className="text-gray-400 mt-1">Create and customize your AI agents</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1EAEDB]/5 via-transparent to-[#0FA0CE]/5"></div>
              <div className="relative">
                <AgentTemplates />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Agents List</h2>
                </div>
                <div className="p-6">
                  <AgentsList />
                </div>
              </div>
              
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
      <FeatureOnboarding />
      <TutorialOverlay />
    </div>
  );
}
