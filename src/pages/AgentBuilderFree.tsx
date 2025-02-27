
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, BookOpen, Sparkles, Code, Rocket, BrainCircuit } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const AgentBuilderFree = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    // Validate inputs
    if (!agentName) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your agent",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Prepare agent data
      const agentData = {
        name: agentName,
        description: agentDescription || "No description provided",
        systemPrompt: agentPrompt || "You are a helpful AI assistant.",
        features: {
          web_search: false,
          file_upload: false,
          custom_knowledge: false
        },
        version: "free"
      };

      // If user is not authenticated, redirect to auth with agent data
      if (!isAuthenticated) {
        const encodedData = encodeURIComponent(JSON.stringify(agentData));
        navigate(`/auth?redirectTo=/agent-builder&agentData=${encodedData}`);
        return;
      }

      // Here would go the code to save the agent to the database
      console.log("Creating agent:", agentData);
      
      // Show success message
      toast({
        title: "Agent created!",
        description: `${agentName} has been created successfully.`,
      });
      
      // Redirect to agent dashboard or test interface
      // This is a placeholder - we would navigate to the actual agent
      navigate('/agents');
    } catch (error) {
      console.error("Error creating agent:", error);
      toast({
        title: "Error",
        description: "Failed to create your agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpgradeToPro = () => {
    toast({
      title: "Upgrade available",
      description: "You're being redirected to the Pro version.",
    });
    navigate('/agent-builder/pro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Agent Builder</h1>
            <p className="text-gray-400 mt-2">Create your own AI chat agent with our free builder</p>
          </div>
          <Button 
            onClick={handleUpgradeToPro}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>

        <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="text-sm sm:text-base">
              <Bot className="mr-2 h-4 w-4" />
              Basic Configuration
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm sm:text-base">
              <Rocket className="mr-2 h-4 w-4" />
              Test & Preview
            </TabsTrigger>
            <TabsTrigger value="deploy" className="text-sm sm:text-base">
              <Code className="mr-2 h-4 w-4" />
              Deploy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure the basic details of your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Agent Name*
                  </label>
                  <Input
                    id="name"
                    placeholder="E.g., Customer Support Assistant"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="What does your agent do? Who is it for?"
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    className="bg-gray-900 border-gray-700 min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">
                    System Prompt
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Instructions for your AI agent's behavior and knowledge..."
                    value={agentPrompt}
                    onChange={(e) => setAgentPrompt(e.target.value)}
                    className="bg-gray-900 border-gray-700 min-h-[120px]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This defines how your agent will behave and respond.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BrainCircuit className="mr-2 h-5 w-5 text-blue-400" />
                  Advanced Features 
                  <span className="ml-2 bg-gray-700 text-xs px-2 py-1 rounded">PRO</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enhance your agent with advanced capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center p-3 rounded bg-gray-700/30 opacity-60 cursor-not-allowed">
                    <div className="font-medium">Web Search</div>
                    <span className="ml-auto bg-gray-700 text-xs px-2 py-1 rounded">PRO</span>
                  </div>
                  <div className="flex items-center p-3 rounded bg-gray-700/30 opacity-60 cursor-not-allowed">
                    <div className="font-medium">File Upload & Processing</div>
                    <span className="ml-auto bg-gray-700 text-xs px-2 py-1 rounded">PRO</span>
                  </div>
                  <div className="flex items-center p-3 rounded bg-gray-700/30 opacity-60 cursor-not-allowed">
                    <div className="font-medium">Custom Knowledge Base</div>
                    <span className="ml-auto bg-gray-700 text-xs px-2 py-1 rounded">PRO</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={handleUpgradeToPro}
                  className="w-full bg-transparent border-blue-500 text-blue-400 hover:bg-blue-900/20"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro for Advanced Features
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Test Your Agent</CardTitle>
                <CardDescription className="text-gray-400">
                  Preview how your agent will respond to user queries
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex flex-col items-center justify-center">
                {agentName ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{agentName}</h3>
                    <p className="text-gray-400 mb-6">{agentDescription || "No description provided"}</p>
                    <Button
                      disabled={!agentName}
                      onClick={handleCreate}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Agent to Test
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Agent Configured</h3>
                    <p className="text-gray-400 mb-1">Fill in the basic information first</p>
                    <p className="text-gray-500 text-sm">Switch to the "Basic Configuration" tab to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deploy">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Deploy Your Agent</CardTitle>
                <CardDescription className="text-gray-400">
                  Get code to embed your agent on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex flex-col items-center justify-center">
                {agentName ? (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Ready to Deploy</h3>
                    <p className="text-gray-400 mb-6">Create your agent first to get the embed code</p>
                    <Button
                      disabled={!agentName}
                      onClick={handleCreate}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Agent to Get Code
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Agent Configured</h3>
                    <p className="text-gray-400 mb-1">Fill in the basic information first</p>
                    <p className="text-gray-500 text-sm">Switch to the "Basic Configuration" tab to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          {activeTab === 'basic' && (
            <Button 
              onClick={() => setActiveTab('preview')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next: Preview
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {(activeTab === 'preview' || activeTab === 'deploy') && (
            <Button
              disabled={!agentName || isCreating}
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700"
            >
              {isCreating ? "Creating..." : "Create Agent"}
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentBuilderFree;
