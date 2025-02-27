
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bot, BookOpen, Sparkles, Code, Rocket, BrainCircuit, Upload, Globe, Database, Zap } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Slider } from "@/components/ui/slider";

const AgentBuilderPro = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [agentPrompt, setAgentPrompt] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [temperature, setTemperature] = useState([0.7]);
  const [activeTab, setActiveTab] = useState('basic');
  const [isCreating, setIsCreating] = useState(false);
  
  // Advanced feature toggles
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [fileUploadEnabled, setFileUploadEnabled] = useState(false);
  const [customKnowledgeEnabled, setCustomKnowledgeEnabled] = useState(false);

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
        settings: {
          model: model,
          temperature: temperature[0],
        },
        features: {
          web_search: webSearchEnabled,
          file_upload: fileUploadEnabled,
          custom_knowledge: customKnowledgeEnabled
        },
        version: "pro"
      };

      // If user is not authenticated, redirect to auth with agent data
      if (!isAuthenticated) {
        const encodedData = encodeURIComponent(JSON.stringify(agentData));
        navigate(`/auth?redirectTo=/agent-builder/pro&agentData=${encodedData}`);
        return;
      }

      // Here would go the code to save the agent to the database
      console.log("Creating pro agent:", agentData);
      
      // Show success message
      toast({
        title: "Agent created!",
        description: `${agentName} has been created successfully with pro features.`,
      });
      
      // Redirect to agent dashboard or test interface
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-black text-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">Pro Agent Builder</h1>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 px-2 py-1 text-xs rounded-full font-semibold">
                PRO
              </span>
            </div>
            <p className="text-blue-200">Create advanced AI agents with premium capabilities</p>
          </div>
          <Button 
            onClick={() => navigate('/agent-builder')}
            variant="outline"
            className="border-white/20 hover:bg-white/10"
          >
            Switch to Free Version
          </Button>
        </div>

        <Tabs defaultValue="basic" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basic" className="text-sm sm:text-base">
              <Bot className="mr-2 h-4 w-4" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-sm sm:text-base">
              <BrainCircuit className="mr-2 h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm sm:text-base">
              <Rocket className="mr-2 h-4 w-4" />
              Test
            </TabsTrigger>
            <TabsTrigger value="deploy" className="text-sm sm:text-base">
              <Code className="mr-2 h-4 w-4" />
              Deploy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-blue-900/30 border-blue-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-blue-300" />
                  Agent Information
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Configure the basic details of your AI agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="pro-name" className="text-sm font-medium">
                    Agent Name*
                  </label>
                  <Input
                    id="pro-name"
                    placeholder="E.g., Advanced Customer Support Assistant"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-blue-950/50 border-blue-700/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pro-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="pro-description"
                    placeholder="What does your agent do? Who is it for?"
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    className="bg-blue-950/50 border-blue-700/50 min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pro-prompt" className="text-sm font-medium">
                    System Prompt
                  </label>
                  <Textarea
                    id="pro-prompt"
                    placeholder="Detailed instructions for your AI agent's behavior and knowledge..."
                    value={agentPrompt}
                    onChange={(e) => setAgentPrompt(e.target.value)}
                    className="bg-blue-950/50 border-blue-700/50 min-h-[120px]"
                  />
                  <p className="text-xs text-blue-200 mt-1">
                    Pro tip: Create detailed, specific instructions to get the best results from your agent.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/30 border-blue-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-blue-300" />
                  Model Configuration
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Select the AI model and adjust parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="model">AI Model</Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger id="model" className="bg-blue-950/50 border-blue-700/50">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-900 border-blue-700/50">
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast & Efficient)</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o (Advanced Capabilities)</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Powerful)</SelectItem>
                      <SelectItem value="claude-3">Claude 3 (Anthropic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="temperature">Temperature: {temperature[0].toFixed(1)}</Label>
                      <span className="text-sm text-blue-200">
                        {temperature[0] < 0.4 ? "More focused" : 
                         temperature[0] < 0.8 ? "Balanced" : "More creative"}
                      </span>
                    </div>
                    <Slider
                      id="temperature"
                      value={temperature}
                      min={0}
                      max={1}
                      step={0.1}
                      onValueChange={setTemperature}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-blue-300 mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-blue-900/30 border-blue-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BrainCircuit className="mr-2 h-5 w-5 text-blue-300" />
                  Advanced Capabilities
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Enable powerful features for your pro agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-800/30">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-300 mr-3" />
                    <div>
                      <h3 className="font-medium">Web Search</h3>
                      <p className="text-sm text-blue-200">Allow your agent to search the web for current information</p>
                    </div>
                  </div>
                  <Switch
                    checked={webSearchEnabled}
                    onCheckedChange={setWebSearchEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-800/30">
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-blue-300 mr-3" />
                    <div>
                      <h3 className="font-medium">File Upload & Processing</h3>
                      <p className="text-sm text-blue-200">Allow users to upload files for your agent to analyze</p>
                    </div>
                  </div>
                  <Switch
                    checked={fileUploadEnabled}
                    onCheckedChange={setFileUploadEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-800/30">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-blue-300 mr-3" />
                    <div>
                      <h3 className="font-medium">Custom Knowledge Base</h3>
                      <p className="text-sm text-blue-200">Train your agent on specific documents or websites</p>
                    </div>
                  </div>
                  <Switch
                    checked={customKnowledgeEnabled}
                    onCheckedChange={setCustomKnowledgeEnabled}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-blue-700/30 pt-4">
                <p className="text-xs text-blue-200">
                  <Sparkles className="inline h-3 w-3 mr-1" />
                  Pro features may consume additional tokens based on usage.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card className="bg-blue-900/30 border-blue-700/50 min-h-[500px]">
              <CardHeader>
                <CardTitle>Test Your Pro Agent</CardTitle>
                <CardDescription className="text-blue-200">
                  Preview how your agent will respond with its advanced capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                {agentName ? (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                      <Bot className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">{agentName}</h3>
                    <p className="text-blue-200 mb-2">{agentDescription || "No description provided"}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
                      {webSearchEnabled && (
                        <span className="bg-blue-800/50 text-blue-200 text-xs px-3 py-1 rounded-full flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          Web Search
                        </span>
                      )}
                      {fileUploadEnabled && (
                        <span className="bg-blue-800/50 text-blue-200 text-xs px-3 py-1 rounded-full flex items-center">
                          <Upload className="h-3 w-3 mr-1" />
                          File Upload
                        </span>
                      )}
                      {customKnowledgeEnabled && (
                        <span className="bg-blue-800/50 text-blue-200 text-xs px-3 py-1 rounded-full flex items-center">
                          <Database className="h-3 w-3 mr-1" />
                          Custom KB
                        </span>
                      )}
                      <span className="bg-blue-800/50 text-blue-200 text-xs px-3 py-1 rounded-full flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        {model}
                      </span>
                    </div>
                    
                    <Button
                      disabled={!agentName}
                      onClick={handleCreate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Create Agent to Test
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                    <h3 className="text-xl font-medium mb-2">No Agent Configured</h3>
                    <p className="text-blue-200 mb-1">Fill in the basic information first</p>
                    <p className="text-blue-300/70 text-sm">Complete the "Basic" and "Advanced" tabs to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deploy">
            <Card className="bg-blue-900/30 border-blue-700/50 min-h-[500px]">
              <CardHeader>
                <CardTitle>Deploy Your Pro Agent</CardTitle>
                <CardDescription className="text-blue-200">
                  Get code to embed your pro agent on your website
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                {agentName ? (
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                      <Code className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Ready to Deploy {agentName}</h3>
                    <p className="text-blue-200 mb-6">Your pro agent includes all selected advanced features</p>
                    
                    <Button
                      disabled={!agentName}
                      onClick={handleCreate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Create Agent to Get Code
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-blue-400/50 mx-auto mb-6" />
                    <h3 className="text-xl font-medium mb-2">No Agent Configured</h3>
                    <p className="text-blue-200 mb-1">Fill in the information first</p>
                    <p className="text-blue-300/70 text-sm">Complete configuration to generate deployment code</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          {activeTab === 'basic' && (
            <Button 
              onClick={() => setActiveTab('advanced')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Next: Advanced Features
              <BrainCircuit className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {activeTab === 'advanced' && (
            <Button 
              onClick={() => setActiveTab('preview')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Next: Preview
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {(activeTab === 'preview' || activeTab === 'deploy') && (
            <Button
              disabled={!agentName || isCreating}
              onClick={handleCreate}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {isCreating ? "Creating..." : "Create Pro Agent"}
              <Rocket className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentBuilderPro;
