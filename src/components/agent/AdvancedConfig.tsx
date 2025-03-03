import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BrainCircuit, Database, FileCode, Dices, Server, Lock } from "lucide-react";
import { useTokens } from "@/context/TokenContext";
import { TokenPurchaseDialog } from "@/components/tokens/TokenPurchaseDialog";

export function AdvancedConfig() {
  const { tokens } = useTokens();
  const [showTokenDialog, setShowTokenDialog] = React.useState(false);

  const handleProFeatureClick = () => {
    setShowTokenDialog(true);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="model">
        <TabsList className="w-full grid grid-cols-4 gap-2">
          <TabsTrigger value="model" className="text-white data-[state=active]:bg-[#30363D]">
            <BrainCircuit className="w-4 h-4 mr-2" />
            Model
          </TabsTrigger>
          <TabsTrigger value="training" className="text-white data-[state=active]:bg-[#30363D]">
            <Database className="w-4 h-4 mr-2" />
            Training
          </TabsTrigger>
          <TabsTrigger value="code" className="text-white data-[state=active]:bg-[#30363D]">
            <FileCode className="w-4 h-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger value="apis" className="text-white data-[state=active]:bg-[#30363D]">
            <Server className="w-4 h-4 mr-2" />
            APIs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">Model Selection</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 border border-[#30363D] rounded-lg bg-[#1C2128] flex items-start gap-2 relative group">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <Dices className="w-5 h-5 text-[#FEC6A1] mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">GPT-4 Turbo</h4>
                    <p className="text-xs text-gray-400">Latest advanced model</p>
                  </div>
                </div>
                <div className="p-3 border border-[#30363D] rounded-lg bg-[#1C2128] flex items-start gap-2">
                  <Dices className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">GPT-3.5 Turbo</h4>
                    <p className="text-xs text-gray-400">Fast & cost-effective</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Advanced Parameters</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 border border-[#30363D] rounded-lg bg-[#1C2128] space-y-2 relative group">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={handleProFeatureClick}>
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-white">Temperature</h4>
                    <span className="text-xs font-medium bg-[#30363D] px-2 py-0.5 rounded text-gray-300">0.7</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    defaultValue="0.7"
                    className="w-full opacity-50 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-400">Controls randomness: lower values are more focused, higher values more creative.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="pt-4">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-center space-y-3 max-w-md">
              <Database className="w-12 h-12 text-[#FEC6A1]/50 mx-auto" />
              <h3 className="text-lg font-medium text-white">Custom Training Data</h3>
              <p className="text-sm text-gray-400">
                Upload your documents, websites, and knowledge bases to train this agent on your specific content.
              </p>
              <Button 
                className="bg-[#FEC6A1]/20 text-[#FEC6A1] hover:bg-[#FEC6A1]/30 border-0"
                onClick={handleProFeatureClick}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Pro Feature
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="pt-4">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-center space-y-3 max-w-md">
              <FileCode className="w-12 h-12 text-[#FEC6A1]/50 mx-auto" />
              <h3 className="text-lg font-medium text-white">Code Execution</h3>
              <p className="text-sm text-gray-400">
                Enable your agent to run code snippets and execute functions on demand.
              </p>
              <Button 
                className="bg-[#FEC6A1]/20 text-[#FEC6A1] hover:bg-[#FEC6A1]/30 border-0"
                onClick={handleProFeatureClick}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Pro Feature
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="apis" className="pt-4">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-center space-y-3 max-w-md">
              <Server className="w-12 h-12 text-[#FEC6A1]/50 mx-auto" />
              <h3 className="text-lg font-medium text-white">API Integrations</h3>
              <p className="text-sm text-gray-400">
                Connect your agent to external APIs for real-time data and actions.
              </p>
              <Button 
                className="bg-[#FEC6A1]/20 text-[#FEC6A1] hover:bg-[#FEC6A1]/30 border-0"
                onClick={handleProFeatureClick}
              >
                <Lock className="w-4 h-4 mr-2" />
                Unlock Pro Feature
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <TokenPurchaseDialog
        open={showTokenDialog}
        onClose={() => setShowTokenDialog(false)}
        message="Upgrade to Pro to access advanced features and customization options."
      />
    </div>
  );
}