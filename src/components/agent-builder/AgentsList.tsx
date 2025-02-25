
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface AgentsListProps {
  agents: Agent[];
}

export function AgentsList({ agents }: AgentsListProps) {
  return (
    <div className="space-y-4">
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
  );
}
