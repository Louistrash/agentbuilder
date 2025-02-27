
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Index page loaded");
    document.body.classList.add('dark');
  }, []);

  const handleCreateAgentClick = (type: 'free' | 'pro') => {
    console.log(`Navigating to ${type} agent builder`);
    navigate(`/agent-builder/${type}`);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-4">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Create Intelligent Chat Agents
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Build, customize, and deploy AI chat agents for your business. Enhance customer engagement with intelligent conversations.
          </p>
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <Button
              onClick={() => handleCreateAgentClick('free')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Agent (Free)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCreateAgentClick('pro')}
              className="w-full border-2 text-white h-12"
            >
              <Plus className="h-5 w-5 mr-2" />
              Access Pro Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
