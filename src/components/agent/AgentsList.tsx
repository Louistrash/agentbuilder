
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Settings } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface AgentsListProps {
  agents?: Agent[];
}

export function AgentsList({ agents = [] }: AgentsListProps) {
  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <Card key={agent.id} className="bg-[#1C2128] border-[#30363D] hover:border-purple-500/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 mt-1">
                  <Bot className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{agent.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{agent.description}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
      {agents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No agents created yet</p>
        </div>
      )}
    </div>
  );
}
