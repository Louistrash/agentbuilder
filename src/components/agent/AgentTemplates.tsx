import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Brain, ShoppingCart } from "lucide-react";
const templates = [{
  id: 1,
  name: 'Customer Support',
  description: 'Handle customer inquiries and support tickets',
  icon: MessageSquare
}, {
  id: 2,
  name: 'Sales Assistant',
  description: 'Convert leads and handle sales conversations',
  icon: ShoppingCart
}, {
  id: 3,
  name: 'Knowledge Base',
  description: 'Answer questions from your documentation',
  icon: Brain
}];
export function AgentTemplates() {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map(template => {
      const Icon = template.icon;
      return <Card key={template.id} className="bg-[#1C2128] border-[#30363D] hover:border-purple-500/50 transition-colors">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-2 w-fit rounded-lg bg-[#0b181b]/10">
                  <Icon className="w-5 h-5 text-purple-500 bg-[#1eaedb]/10" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
                <Button variant="secondary" className="w-full bg-white/5 hover:bg-white/10">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>;
    })}
    </div>;
}