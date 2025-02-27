
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTokens } from "@/context/TokenContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TokenPurchaseDialog } from "@/components/tokens/TokenPurchaseDialog";
import { Bot, MessageSquare, ShoppingCart, Headphones, BrainCircuit, Lock, Coins } from "lucide-react";

const AGENT_COST = 25; // Cost per agent in tokens

interface AgentTemplate {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface AgentTemplatesProps {
  onCreateAgent: (template: { name: string; description: string }) => void;
}

export function AgentTemplates({ onCreateAgent }: AgentTemplatesProps) {
  const { tokens, useTokens: spendTokens } = useTokens();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const templates: AgentTemplate[] = [
    {
      name: "Customer Service",
      description: "Help users with common questions and issues",
      icon: <Headphones className="h-10 w-10" />,
      color: "text-blue-400 bg-blue-400/10"
    },
    {
      name: "Sales Assistant",
      description: "Guide customers through purchasing decisions",
      icon: <ShoppingCart className="h-10 w-10" />,
      color: "text-green-400 bg-green-400/10"
    },
    {
      name: "Technical Support",
      description: "Provide technical assistance and troubleshooting",
      icon: <BrainCircuit className="h-10 w-10" />,
      color: "text-purple-400 bg-purple-400/10"
    },
    {
      name: "Knowledge Base",
      description: "Answer questions based on your company's information",
      icon: <MessageSquare className="h-10 w-10" />,
      color: "text-orange-400 bg-orange-400/10"
    }
  ];

  const handleTemplateClick = async (template: AgentTemplate) => {
    // Check if user has already created 2 agents by counting existing token transactions
    try {
      const { data: existingAgents, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('feature_used', 'agent_creation')
        .eq('transaction_type', 'debit');

      if (error) throw error;

      // If user has already created 2 agents, show purchase dialog
      if (existingAgents && existingAgents.length >= 2) {
        setPurchaseMessage("Free accounts are limited to 2 agents. Upgrade to Pro or purchase more tokens to create additional agents.");
        setIsPurchaseDialogOpen(true);
        return;
      }

      // Check if user has enough tokens
      if (tokens < AGENT_COST) {
        setPurchaseMessage(`You need ${AGENT_COST} tokens to create an agent, but you only have ${tokens} tokens left.`);
        setIsPurchaseDialogOpen(true);
        return;
      }

      // Spend tokens
      const success = await spendTokens(AGENT_COST, 'agent_creation');
      if (!success) {
        toast({
          title: "Token Error",
          description: "There was an issue with your tokens. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Create the agent
      onCreateAgent({
        name: template.name,
        description: template.description
      });

      toast({
        title: "Agent Created",
        description: `${template.name} agent created successfully! ${AGENT_COST} tokens used.`,
      });
    } catch (error) {
      console.error("Error creating agent:", error);
      toast({
        title: "Error Creating Agent",
        description: "There was an error creating your agent. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template, index) => (
          <Card
            key={index}
            className="bg-[#1C2128] border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors cursor-pointer"
            onClick={() => handleTemplateClick(template)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${template.color} w-fit`}>
                  {template.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{template.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-[#1EAEDB] flex items-center">
                    <Coins className="h-3.5 w-3.5 mr-1" />
                    {AGENT_COST} tokens
                  </div>
                  <Button variant="ghost" size="sm" className="text-white bg-[#30363D] hover:bg-[#3E4956]">
                    Select
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TokenPurchaseDialog 
        open={isPurchaseDialogOpen} 
        onClose={() => setIsPurchaseDialogOpen(false)} 
        message={purchaseMessage}
      />
    </>
  );
}
