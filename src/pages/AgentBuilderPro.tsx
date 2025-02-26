
import React, { useEffect, useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Sparkles, BrainCircuit, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AgentBuilderPro() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('logo_url')
        .single();
      if (error) throw error;
      setLogoUrl(data?.logo_url);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Header logoUrl={logoUrl} />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-1 bg-[#1EAEDB]/10 rounded-full text-[#1EAEDB] text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Pro Builder
            </div>
            <h1 className="text-3xl font-bold mb-4">Advanced Agent Builder</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access premium features and create sophisticated AI agents with advanced capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#161B22] border-[#30363D]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#1EAEDB]" />
                  Advanced Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Language Model</Label>
                  <Input 
                    placeholder="Select model..."
                    className="bg-[#1C2128] border-[#30363D]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Input 
                    type="number" 
                    placeholder="0.7"
                    className="bg-[#1C2128] border-[#30363D]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#161B22] border-[#30363D]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#1EAEDB]" />
                  Custom Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Training Data</Label>
                  <Input 
                    type="file"
                    className="bg-[#1C2128] border-[#30363D]"
                  />
                </div>
                <Button className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90">
                  Upload Training Data
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#161B22] border-[#30363D]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#1EAEDB]" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input 
                  type="password"
                  placeholder="Enter your API key..."
                  className="bg-[#1C2128] border-[#30363D]"
                />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input 
                  placeholder="https://api.example.com/webhook"
                  className="bg-[#1C2128] border-[#30363D]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
