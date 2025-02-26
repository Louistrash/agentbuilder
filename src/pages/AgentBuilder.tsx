
import React from 'react';
import { AgentsList } from "@/components/agent/AgentsList";
import { AdvancedConfig } from "@/components/agent/AdvancedConfig";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";
import { FeatureOnboarding } from "@/components/onboarding/FeatureOnboarding";
import { TutorialOverlay } from "@/components/onboarding/TutorialOverlay";
import { Header } from "@/components/agent/Header";
import { ProFeatures } from "@/components/agent/ProFeatures";

export default function AgentBuilder() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          <Header />
          <ProFeatures />

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
