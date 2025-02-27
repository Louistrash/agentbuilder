
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, MessageSquare, Briefcase, Brain, Users } from "lucide-react";

interface TemplateProps {
  onCreateAgent: (template: { name: string; description: string }) => void;
}

const templates = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'An agent that helps with product inquiries and support requests.',
    icon: <Users className="h-5 w-5 text-blue-400" />,
    category: 'support',
    popular: true
  },
  {
    id: 'personal-assistant',
    name: 'Personal Assistant',
    description: 'A helpful assistant for scheduling and daily tasks.',
    icon: <Briefcase className="h-5 w-5 text-green-400" />,
    category: 'productivity',
    popular: false
  },
  {
    id: 'coding-assistant',
    name: 'Coding Assistant',
    description: 'Helps with programming questions and code snippets.',
    icon: <Code className="h-5 w-5 text-purple-400" />,
    category: 'development',
    popular: true
  },
  {
    id: 'knowledge-base',
    name: 'Knowledge Base',
    description: 'Answers questions based on your organization's information.',
    icon: <Brain className="h-5 w-5 text-orange-400" />,
    category: 'knowledge',
    popular: false
  },
  {
    id: 'marketing-bot',
    name: 'Marketing Bot',
    description: 'Engages with potential customers and generates leads.',
    icon: <MessageSquare className="h-5 w-5 text-pink-400" />,
    category: 'marketing',
    popular: false
  },
  {
    id: 'custom-bot',
    name: 'Custom Bot',
    description: 'Create a bot with custom instructions and capabilities.',
    icon: <Bot className="h-5 w-5 text-gray-400" />,
    category: 'custom',
    popular: false
  }
];

export const AgentTemplates: React.FC<TemplateProps> = ({ onCreateAgent }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="bg-[#1C2128] border-[#30363D] hover:border-[#FEC6A1]/50 transition-colors cursor-pointer"
            onClick={() => onCreateAgent({ name: template.name, description: template.description })}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-[#262B33]">
                    {template.icon}
                  </div>
                  {template.popular && (
                    <Badge className="bg-[#FEC6A1]/20 text-[#FEC6A1] hover:bg-[#FEC6A1]/30 ml-auto">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-white text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-white border-[#30363D] bg-[#222222] hover:bg-[#333333]"
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
