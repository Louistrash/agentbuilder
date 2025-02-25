
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
}

export default function AgentBuilder() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
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
      
      // Type assertion since we know the shape matches our Agent interface
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
          is_active: true
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
      
      // Refresh agents list
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

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Agent Form */}
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

              <Button type="submit" className="w-full">
                Create Agent
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Agents List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Agents</h2>
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(agent.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
          {agents.length === 0 && (
            <p className="text-gray-500 text-center">No agents created yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
