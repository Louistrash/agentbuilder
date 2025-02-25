import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AdvancedConfig } from "@/components/agent-builder/AdvancedConfig";
import { TestInterface } from "@/components/agent-builder/TestInterface";
import { AgentsList } from "@/components/agent-builder/AgentsList";
import { AgentTemplates } from "@/components/agent-builder/AgentTemplates";
import { TutorialOverlay } from "@/components/agent-builder/TutorialOverlay";

interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
  temperature?: number;
  model?: string;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export default function AgentBuilder() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState("gpt-4o-mini");
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAgents();
    }
  }, [user]);

  const fetchAgents = async () => {
    try {
      const { data: agents, error } = await supabase
        .from('chat_agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgents(agents as Agent[]);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load agents. Please try again.",
      });
    }
  };

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to create an agent.",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('chat_agents')
        .insert({
          name,
          description,
          system_prompt: systemPrompt,
          created_by: user.id,
          is_active: true,
          temperature,
          model,
          max_tokens: maxTokens,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Agent created successfully!",
      });

      // Reset form
      setName("");
      setDescription("");
      setSystemPrompt("");
      setTemperature(0.7);
      setModel("gpt-4o-mini");
      setMaxTokens(2048);
      setTopP(1);
      setFrequencyPenalty(0);
      setPresencePenalty(0);
      
      fetchAgents();
    } catch (error) {
      console.error('Error creating agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create agent. Please try again.",
      });
    }
  };

  const handleSelectTemplate = (template: {
    name: string;
    description: string;
    systemPrompt: string;
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  }) => {
    setName(template.name);
    setDescription(template.description);
    setSystemPrompt(template.systemPrompt);
    setTemperature(template.temperature);
    setMaxTokens(template.maxTokens);
    setTopP(template.topP);
    setFrequencyPenalty(template.frequencyPenalty);
    setPresencePenalty(template.presencePenalty);
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8">
        <TutorialOverlay />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 templates-section">
            <h2 className="text-2xl font-bold mb-4">Templates</h2>
            <AgentTemplates onSelectTemplate={handleSelectTemplate} />
          </div>

          <div className="space-y-6 configuration-section">
            <Card>
              <CardHeader>
                <CardTitle>Create New Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAgent} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter agent name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter agent description"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="systemPrompt" className="block text-sm font-medium mb-1">
                      System Prompt
                    </label>
                    <Textarea
                      id="systemPrompt"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Enter system prompt for the agent..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="model" className="block text-sm font-medium mb-1">
                      Model
                    </label>
                    <select
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                    >
                      <option value="gpt-4o-mini">GPT-4 Mini (Fast)</option>
                      <option value="gpt-4o">GPT-4 (Powerful)</option>
                    </select>
                  </div>

                  <AdvancedConfig
                    temperature={temperature}
                    setTemperature={setTemperature}
                    maxTokens={maxTokens}
                    setMaxTokens={setMaxTokens}
                    topP={topP}
                    setTopP={setTopP}
                    frequencyPenalty={frequencyPenalty}
                    setFrequencyPenalty={setFrequencyPenalty}
                    presencePenalty={presencePenalty}
                    setPresencePenalty={setPresencePenalty}
                  />

                  <Separator className="my-4" />

                  <Button type="submit" className="w-full">
                    Create Agent
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 test-interface">
            <TestInterface
              systemPrompt={systemPrompt}
              temperature={temperature}
              model={model}
              maxTokens={maxTokens}
              topP={topP}
              frequencyPenalty={frequencyPenalty}
              presencePenalty={presencePenalty}
            />
          </div>

          <div className="lg:col-span-2">
            <AgentsList agents={agents} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
