
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Brain, ShoppingCart } from "lucide-react";

const templates = [{
  id: 1,
  name: 'Customer Support',
  description: 'Handle customer inquiries and support tickets',
  icon: MessageSquare,
  color: 'text-[#1EAEDB]',
  buttonColor: 'bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 text-[#1EAEDB] hover:text-[#1EAEDB]/90 border border-[#1EAEDB]/20'
}, {
  id: 2,
  name: 'Sales Assistant',
  description: 'Convert leads and handle sales conversations',
  icon: ShoppingCart,
  color: 'text-[#D946EF]',
  buttonColor: 'bg-[#D946EF]/10 hover:bg-[#D946EF]/20 text-[#D946EF] hover:text-[#D946EF]/90 border border-[#D946EF]/20'
}, {
  id: 3,
  name: 'Knowledge Base',
  description: 'Answer questions from your documentation',
  icon: Brain,
  color: 'text-[#8B5CF6]',
  buttonColor: 'bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 text-[#8B5CF6] hover:text-[#8B5CF6]/90 border border-[#8B5CF6]/20'
}];

export function AgentTemplates() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map(template => {
        const Icon = template.icon;
        return (
          <Card key={template.id} className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className={`p-2 w-fit rounded-lg ${template.color.replace('text-', 'bg-')}/10`}>
                  <Icon className={`w-5 h-5 ${template.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
                <Button 
                  variant="secondary"
                  className={`w-full ${template.buttonColor} transition-all duration-200 shadow-lg hover:shadow-[#1EAEDB]/20`}
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
