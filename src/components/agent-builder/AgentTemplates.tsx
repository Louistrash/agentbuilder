
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Template {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

const templates: Template[] = [
  {
    id: "customer-service",
    name: "Customer Service Agent",
    description: "Helpful and professional customer service representative",
    systemPrompt: "You are a professional customer service representative. Be helpful, courteous, and solution-oriented. Always maintain a professional tone and focus on resolving customer inquiries efficiently.",
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0.3,
    presencePenalty: 0.3
  },
  {
    id: "technical-expert",
    name: "Technical Expert",
    description: "Technical specialist with deep knowledge",
    systemPrompt: "You are a technical expert with deep knowledge in software, hardware, and IT systems. Provide detailed, accurate technical information and explanations. Use technical terminology when appropriate but be able to explain concepts clearly.",
    temperature: 0.4,
    maxTokens: 2048,
    topP: 0.8,
    frequencyPenalty: 0.2,
    presencePenalty: 0.2
  },
  {
    id: "creative-writer",
    name: "Creative Writer",
    description: "Creative and engaging content creator",
    systemPrompt: "You are a creative writer with a flair for engaging storytelling and content creation. Write with creativity and style while maintaining clarity and proper grammar.",
    temperature: 0.9,
    maxTokens: 3072,
    topP: 1,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5
  }
];

interface AgentTemplatesProps {
  onSelectTemplate: (template: Template) => void;
}

export function AgentTemplates({ onSelectTemplate }: AgentTemplatesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {templates.map((template) => (
        <Card key={template.id} className="hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectTemplate(template)}
            >
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
