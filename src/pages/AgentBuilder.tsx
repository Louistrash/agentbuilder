
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AgentBuilder() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState("gpt-4o-mini");
  const [testMessages, setTestMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          model
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Agent created successfully!",
      });

      setName("");
      setDescription("");
      setSystemPrompt("");
      setTemperature(0.7);
      setModel("gpt-4o-mini");
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

  const handleTest = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setTestMessages(prev => [...prev, { role: 'user', content: userInput }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...testMessages, { role: 'user', content: userInput }],
          systemPrompt,
          temperature,
          model,
        }),
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setTestMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error) {
      console.error('Error testing agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to test agent. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Agent Form */}
        <div className="space-y-6">
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

                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium mb-1">
                    Temperature: {temperature}
                  </label>
                  <Input
                    id="temperature"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower values make responses more focused and deterministic, higher values make them more creative and varied.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Create Agent
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Test Your Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border p-4 mb-4">
                {testMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted mr-12'
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center text-muted-foreground">
                    Thinking...
                  </div>
                )}
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type a message to test..."
                  onKeyPress={(e) => e.key === 'Enter' && handleTest()}
                />
                <Button onClick={handleTest} disabled={isLoading}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <CardTitle>{agent.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Model: {agent.model || 'Default'}</p>
                    <p>Temperature: {agent.temperature || '0.7'}</p>
                    <p>Created: {new Date(agent.created_at).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {agents.length === 0 && (
              <p className="text-gray-500 text-center col-span-full">No agents created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
