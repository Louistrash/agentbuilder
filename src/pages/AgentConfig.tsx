
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Bot, Lock, Coins, Globe, Code, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";

interface ProFeature {
  id: string;
  name: string;
  description: string;
  tokens: number;
  enabled: boolean;
}

export default function AgentConfig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [agent, setAgent] = useState<any>(null);
  const [availableTokens, setAvailableTokens] = useState(50);
  const [trainingUrl, setTrainingUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const proFeatures: ProFeature[] = [
    {
      id: 'multimodal',
      name: 'Multimodal Support',
      description: 'Enable image and voice processing capabilities',
      tokens: 25,
      enabled: false
    },
    {
      id: 'memory',
      name: 'Long-term Memory',
      description: 'Remember past conversations and user preferences',
      tokens: 30,
      enabled: false
    },
    {
      id: 'multilingual',
      name: 'Multilingual Support',
      description: 'Communicate in multiple languages',
      tokens: 20,
      enabled: false
    },
    {
      id: 'unlimited_training',
      name: 'Unlimited Training Data',
      description: 'Train your agent with unlimited website content',
      tokens: 40,
      enabled: false
    }
  ];

  useEffect(() => {
    // In a real app, fetch the agent data from your backend
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

    setAvailableTokens(prev => 
      feature.enabled ? prev + feature.tokens : prev - feature.tokens
    );
  };

  const handleTrainAgent = async () => {
    if (!trainingUrl) return;

    setIsProcessing(true);
    // Simulated API call
    setTimeout(() => {
      toast({
        title: "Training Started",
        description: "Your agent is being trained with the provided website content.",
      });
      setIsProcessing(false);
      setTrainingUrl('');
    }, 2000);
  };

  if (!agent) return null;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/agents')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
            <div className="flex-1" />
            <Badge variant="outline" className="bg-[#1A1F2C] text-white px-3 py-1.5">
              <Coins className="w-4 h-4 mr-2 text-[#1EAEDB]" />
              {availableTokens} tokens available
            </Badge>
          </div>

          <Tabs defaultValue="config" className="space-y-6">
            <TabsList className="bg-[#161B22] border-[#30363D] p-1 rounded-lg">
              <TabsTrigger value="config" className="data-[state=active]:bg-[#1C2128] text-sm">
                <Bot className="w-4 h-4 mr-2" />
                Configuration
              </TabsTrigger>
              <TabsTrigger value="test" className="data-[state=active]:bg-[#1C2128] text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Test Agent
              </TabsTrigger>
              <TabsTrigger value="train" className="data-[state=active]:bg-[#1C2128] text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Training
              </TabsTrigger>
              <TabsTrigger value="embed" className="data-[state=active]:bg-[#1C2128] text-sm">
                <Code className="w-4 h-4 mr-2" />
                Embed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="config">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-[#161B22] border-[#30363D]">
                    <CardHeader className="border-b border-[#30363D]">
                      <CardTitle className="flex items-center gap-2 text-lg font-medium">
                        <Bot className="w-5 h-5 text-[#1EAEDB]" />
                        Basic Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Agent Name</Label>
                        <Input
                          id="name"
                          value={agent.name}
                          className="bg-[#1C2128] border-[#30363D] text-white"
                          placeholder="Enter agent name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">Description</Label>
                        <Textarea
                          id="description"
                          value={agent.description}
                          className="bg-[#1C2128] border-[#30363D] text-white min-h-[100px]"
                          placeholder="Describe your agent's purpose"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="systemPrompt" className="text-gray-300">System Prompt</Label>
                        <Textarea
                          id="systemPrompt"
                          value={agent.systemPrompt}
                          className="bg-[#1C2128] border-[#30363D] text-white min-h-[150px]"
                          placeholder="Define how your agent should behave"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-[#161B22] border-[#30363D]">
                    <CardHeader className="border-b border-[#30363D]">
                      <CardTitle className="flex items-center gap-2 text-lg font-medium">
                        <Lock className="w-5 h-5 text-[#1EAEDB]" />
                        Pro Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      {proFeatures.map((feature) => (
                        <div
                          key={feature.id}
                          className="p-4 rounded-lg bg-[#1C2128] border border-[#30363D] space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-white">{feature.name}</h3>
                              <p className="text-sm text-gray-400 mt-1">
                                {feature.description}
                              </p>
                            </div>
                            <Badge variant="secondary" className="bg-[#1EAEDB]/10 text-[#1EAEDB] border-0">
                              {feature.tokens} tokens
                            </Badge>
                          </div>
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={() => handleFeatureToggle(feature.id)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Button className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-500" />
                    Train with Website Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="url"
                        value={trainingUrl}
                        onChange={(e) => setTrainingUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="bg-[#1C2128] border-[#30363D]"
                      />
                      <Button 
                        onClick={handleTrainAgent}
                        disabled={isProcessing || !trainingUrl}
                      >
                        Train Agent
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Free users can train with up to 5 pages. Upgrade to Pro for unlimited training data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="embed">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
