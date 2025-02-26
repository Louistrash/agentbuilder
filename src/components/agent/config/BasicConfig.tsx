
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BasicConfigProps {
  agent: {
    name: string;
    description: string;
    systemPrompt: string;
  };
}

export function BasicConfig({
  agent
}: BasicConfigProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(agent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = () => {
    toast({
      title: "Changes saved",
      description: "Your agent configuration has been updated.",
    });
  };

  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader className="border-b border-[#30363D]">
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-zinc-100">
          <Bot className="w-5 h-5 text-[#1EAEDB]" />
          Basic Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Agent Name</Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#1C2128] border-[#30363D] text-white" 
            placeholder="Enter agent name" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-300">Description</Label>
          <Textarea 
            id="description" 
            name="description"
            value={formData.description} 
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#1C2128] border-[#30363D] text-white min-h-[100px]" 
            placeholder="Describe your agent's purpose" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="systemPrompt" className="text-gray-300">System Prompt</Label>
          <Textarea 
            id="systemPrompt" 
            name="systemPrompt"
            value={formData.systemPrompt} 
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#1C2128] border-[#30363D] text-white min-h-[150px]" 
            placeholder="Define how your agent should behave" 
          />
        </div>
      </CardContent>
    </Card>
  );
}
