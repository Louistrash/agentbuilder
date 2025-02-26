
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bot, Lock, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-500" />
                    Basic Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name</Label>
                    <Input
                      id="name"
                      value={agent.name}
                      className="bg-[#1C2128] border-[#30363D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={agent.description}
                      className="bg-[#1C2128] border-[#30363D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemPrompt">System Prompt</Label>
                    <Textarea
                      id="systemPrompt"
                      value={agent.systemPrompt}
                      className="bg-[#1C2128] border-[#30363D] h-32"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#161B22] border-[#30363D]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-500" />
                    Pro Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-0">
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

              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
