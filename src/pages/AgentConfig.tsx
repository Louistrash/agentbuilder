import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, Coins, Globe, Code, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";
import { BasicConfig } from "@/components/agent/config/BasicConfig";
import { ProFeatures } from "@/components/agent/config/ProFeatures";
import { TrainingSection } from "@/components/agent/config/TrainingSection";

const proFeatures = [{
  id: 'multimodal',
  name: 'Multimodal Support',
  description: 'Enable image and voice processing capabilities',
  tokens: 25,
  enabled: false
}, {
  id: 'memory',
  name: 'Long-term Memory',
  description: 'Remember past conversations and user preferences',
  tokens: 30,
  enabled: false
}, {
  id: 'multilingual',
  name: 'Multilingual Support',
  description: 'Communicate in multiple languages',
  tokens: 20,
  enabled: false
}, {
  id: 'unlimited_training',
  name: 'Unlimited Training Data',
  description: 'Train your agent with unlimited website content',
  tokens: 40,
  enabled: false
}];

export default function AgentConfig() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [agent, setAgent] = useState<any>(null);
  const [availableTokens, setAvailableTokens] = useState(50);
  const [trainingUrl, setTrainingUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fakeAgent = {
      id: Number(id),
      name: "Customer Service Agent",
      description: "Handles customer inquiries and support",
      type: "customer_service",
      systemPrompt: "You are a helpful customer service agent..."
    };
    setAgent(fakeAgent);
  }, [id]);

  const handleFeatureToggle = (featureId: string) => {
    const feature = proFeatures.find(f => f.id === featureId);
    if (!feature) return;
    if (!feature.enabled && feature.tokens > availableTokens) {
      toast({
        title: "Not enough tokens",
        description: `You need ${feature.tokens} tokens to enable this feature.`,
        variant: "destructive"
      });
      return;
    }
    setAvailableTokens(prev => feature.enabled ? prev + feature.tokens : prev - feature.tokens);
  };

  const handleTrainAgent = async () => {
    if (!trainingUrl) return;
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "Training Started",
        description: "Your agent is being trained with the provided website content."
      });
      setIsProcessing(false);
      setTrainingUrl('');
    }, 2000);
  };

  if (!agent) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#1A1F2C] to-[#161B22] text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/agents')}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
            <div className="flex-1" />
            <Badge variant="outline" className="bg-gradient-to-r from-[#1A1F2C] to-[#161B22] border-[#30363D] px-3 py-1.5 shadow-lg">
              <Coins className="w-4 h-4 mr-2 text-[#1EAEDB]" />
              <span className="text-white">{availableTokens} tokens available</span>
            </Badge>
          </div>

          <Tabs defaultValue="config" className="space-y-6">
            <TabsList className="bg-gradient-to-b from-[#161B22] to-[#1C2128] border border-[#30363D] p-1 rounded-lg shadow-xl w-full flex space-x-1">
              <TabsTrigger 
                value="config" 
                className="flex-1 text-zinc-200 hover:text-[#1EAEDB] hover:bg-[#1EAEDB]/10 data-[state=active]:bg-[#1EAEDB]/10 data-[state=active]:text-[#1EAEDB] text-sm px-4 py-2 rounded-md transition-all duration-200"
              >
                <Bot className="w-4 h-4 mr-2" />
                Configuration
              </TabsTrigger>
              <TabsTrigger 
                value="test" 
                className="flex-1 text-zinc-200 hover:text-[#9B87F5] hover:bg-[#9B87F5]/10 data-[state=active]:bg-[#9B87F5]/10 data-[state=active]:text-[#9B87F5] text-sm px-4 py-2 rounded-md transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Test Agent
              </TabsTrigger>
              <TabsTrigger 
                value="train" 
                className="flex-1 text-zinc-200 hover:text-[#EC4899] hover:bg-[#EC4899]/10 data-[state=active]:bg-[#EC4899]/10 data-[state=active]:text-[#EC4899] text-sm px-4 py-2 rounded-md transition-all duration-200"
              >
                <Globe className="w-4 h-4 mr-2" />
                Training
              </TabsTrigger>
              <TabsTrigger 
                value="embed" 
                className="flex-1 text-zinc-200 hover:text-[#F97316] hover:bg-[#F97316]/10 data-[state=active]:bg-[#F97316]/10 data-[state=active]:text-[#F97316] text-sm px-4 py-2 rounded-md transition-all duration-200"
              >
                <Code className="w-4 h-4 mr-2" />
                Embed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="config">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BasicConfig agent={agent} />
                </div>
                <div className="space-y-6">
                  <ProFeatures features={proFeatures} onFeatureToggle={handleFeatureToggle} />
                  <Button className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-200">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    Test Your Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TestInterface />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="train">
              <TrainingSection trainingUrl={trainingUrl} isProcessing={isProcessing} onUrlChange={setTrainingUrl} onTrain={handleTrainAgent} />
            </TabsContent>

            <TabsContent value="embed">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-200">
                    <Code className="w-5 h-5 text-purple-500" />
                    Embed on Your Website
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WidgetCode />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
