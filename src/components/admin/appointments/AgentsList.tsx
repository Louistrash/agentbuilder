
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, Calendar, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentForm } from "./AgentForm";
import { AgentAvailabilityForm } from "./AgentAvailabilityForm";

export const AgentsList = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('name');

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error loading agents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load agents.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsFormOpen(true);
  };

  const handleAvailability = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsAvailabilityOpen(true);
  };

  const handleAddNew = () => {
    setSelectedAgent(undefined);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <div>Loading agents...</div>;
  }

  return (
    <>
      <div className="mb-4">
        <Button onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={agent.profile_image_url} alt={agent.name} />
                <AvatarFallback>
                  <UserCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <Badge variant={agent.is_active ? "default" : "secondary"}>
                  {agent.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{agent.email}</p>
              {agent.bio && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {agent.bio}
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(agent)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAvailability(agent)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AgentForm
        agent={selectedAgent}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={loadAgents}
      />

      {selectedAgent && (
        <AgentAvailabilityForm
          agentId={selectedAgent.id}
          isOpen={isAvailabilityOpen}
          onClose={() => setIsAvailabilityOpen(false)}
        />
      )}
    </>
  );
};
