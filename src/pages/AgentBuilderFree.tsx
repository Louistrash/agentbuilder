
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { MessageSquare, ShoppingCart, Database, Code, Sparkles, BarChart3, Wifi, BrainCircuit, Lock, Users, Bot } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Template data
const agentTemplates = [
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries and support tickets',
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    color: 'blue'
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    description: 'Convert leads and handle sales conversations',
    icon: <ShoppingCart className="h-6 w-6 text-purple-400" />,
    color: 'purple'
  },
  {
    id: 'knowledge-base',
    name: 'Knowledge Base',
    description: 'Answer questions from your documentation',
    icon: <Database className="h-6 w-6 text-indigo-400" />,
    color: 'indigo'
  }
];

// Pro features data
const proFeatures = [
  {
    id: 'advanced-chat',
    name: 'Advanced Chat Features',
    description: 'Multi-turn conversations, context awareness, and customizable personalities',
    icon: <MessageSquare className="h-6 w-6 text-pink-400" />,
    color: 'pink'
  },
  {
    id: 'analytics',
    name: 'Detailed Analytics',
    description: 'Track user engagement, conversation metrics, and performance insights',
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    color: 'blue'
  },
  {
    id: 'api',
    name: 'API Integration',
    description: 'Seamlessly integrate with your existing systems via our REST API',
    icon: <Code className="h-6 w-6 text-green-400" />,
    color: 'green'
  },
  {
    id: 'multi-channel',
    name: 'Multi-Channel Support',
    description: 'Deploy across web, mobile, and messaging platforms',
    icon: <Wifi className="h-6 w-6 text-amber-400" />,
    color: 'amber'
  }
];

// Sample chart data
const chartData = [
  { name: 'Jan', conversations: 400, users: 240 },
  { name: 'Feb', conversations: 300, users: 180 },
  { name: 'Mar', conversations: 500, users: 250 },
  { name: 'Apr', conversations: 780, users: 390 },
  { name: 'May', conversations: 890, users: 480 },
  { name: 'Jun', conversations: 1390, users: 700 },
  { name: 'Jul', conversations: 1490, users: 740 },
];

const AgentBuilderFree = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [agentName, setAgentName] = useState('');
  const [agentDescription, setAgentDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [creatingAgent, setCreatingAgent] = useState(false);
  
  // Counter states
  const [userCount, setUserCount] = useState(0);
  const [conversationCount, setConversationCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);

  // Animation for counters
  useEffect(() => {
    const targetUsers = 15749;
    const targetConversations = 89432;
    const targetAgents = 347;
    const duration = 2000; // 2 seconds
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (progress >= 1) {
        setUserCount(targetUsers);
        setConversationCount(targetConversations);
        setAgentCount(targetAgents);
        clearInterval(timer);
      } else {
        setUserCount(Math.floor(targetUsers * progress));
        setConversationCount(Math.floor(targetConversations * progress));
        setAgentCount(Math.floor(targetAgents * progress));
      }
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = agentTemplates.find(t => t.id === templateId);
    
    if (template) {
      if (template.id === 'customer-support') {
        setAgentName('Customer Support Assistant');
        setAgentDescription('A helpful assistant that handles customer inquiries and support tickets');
        setSystemPrompt('You are a customer support assistant. Help users with their questions and issues in a friendly and professional manner. If you need more information to assist them, ask clarifying questions.');
      } else if (template.id === 'sales-assistant') {
        setAgentName('Sales Representative');
        setAgentDescription('An assistant that helps convert leads and handle sales conversations');
        setSystemPrompt('You are a sales assistant. Help potential customers understand our products and services. Answer their questions, address objections, and guide them through the purchase process without being pushy.');
      } else if (template.id === 'knowledge-base') {
        setAgentName('Knowledge Base Assistant');
        setAgentDescription('An assistant that answers questions from your documentation');
        setSystemPrompt('You are a knowledge base assistant. Your role is to provide accurate information from the documentation. If you don\'t know the answer or if the information isn\'t in your knowledge base, acknowledge that and suggest the user contact support.');
      }
    }
  };

  const handleUpgradeToPro = () => {
    toast({
      title: "Pro Features",
      description: "Upgrade to access advanced capabilities!",
    });
    navigate('/agent-builder/pro');
  };

  const handleTestAgent = () => {
    if (!testMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message to test your agent.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate AI response
    setTestResponse("I'm your AI assistant. This is a simulated response since this is just a preview of the agent builder. In the full version, you would receive actual AI responses based on your system prompt and settings.");
  };

  const handleCreateAgent = () => {
    if (!agentName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your agent",
        variant: "destructive"
      });
      return;
    }

    setCreatingAgent(true);
    
    // Simulate agent creation
    setTimeout(() => {
      toast({
        title: "Agent Created!",
        description: `${agentName} has been created successfully.`,
      });
      setCreatingAgent(false);
      
      // If not authenticated, redirect to auth
      if (!isAuthenticated) {
        navigate('/auth?redirectTo=/agent-builder');
      } else {
        navigate('/agents');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111827] rounded-xl p-6 mb-8 border border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-purple-900/50 p-2 rounded-lg mr-4">
              <BrainCircuit className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Agent Builder</h1>
              <p className="text-gray-400">Create and customize your AI agents</p>
            </div>
          </div>
          <Button 
            onClick={handleUpgradeToPro}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Agent Templates Section */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold">Agent Templates</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {agentTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className={`bg-[#1a2030] rounded-lg p-5 cursor-pointer hover:bg-[#1e2639] transition-colors border border-gray-800 ${selectedTemplate === template.id ? `ring-2 ring-${template.color}-500` : ''}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className={`bg-${template.color}-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                      {template.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-gray-400 text-sm">{template.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex p-4 gap-4 border-t border-gray-800">
                {selectedTemplate && (
                  <Button 
                    className={`bg-${agentTemplates.find(t => t.id === selectedTemplate)?.color}-600 hover:bg-${agentTemplates.find(t => t.id === selectedTemplate)?.color}-700 text-white`}
                    onClick={() => document.getElementById('agent-config')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Use Template
                  </Button>
                )}
              </div>
            </div>

            {/* Your Agents & Advanced Config Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Agents Section - Smaller */}
              <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Your Agents</h2>
                </div>
                <div className="p-6 flex items-center justify-center">
                  <p className="text-gray-400">No agents created yet</p>
                </div>
              </div>

              {/* Advanced Configuration - Now 60% smaller with blur and lock */}
              <div id="agent-config" className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden relative">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Advanced Configuration</h2>
                  <div className="text-purple-400 flex items-center">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm">Pro Feature</span>
                  </div>
                </div>
                <div className="p-4 space-y-3 relative">
                  {/* Blur overlay with upgrade button */}
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-10 flex flex-col items-center justify-center">
                    <Lock className="h-10 w-10 text-purple-400 mb-2" />
                    <h3 className="text-lg font-bold mb-1 text-white">Pro Feature</h3>
                    <p className="text-gray-300 mb-3 text-center text-sm max-w-md px-4">
                      Unlock advanced configuration
                    </p>
                    <Button 
                      onClick={handleUpgradeToPro}
                      className="bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] hover:from-[#C026D3] hover:to-[#7C3AED] text-white text-sm py-1"
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      Upgrade
                    </Button>
                  </div>

                  <div>
                    <label htmlFor="temperature" className="block mb-1 text-sm font-medium">
                      Temperature
                    </label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[temperature]} 
                        min={0} 
                        max={1} 
                        step={0.1}
                        onValueChange={(value) => setTemperature(value[0])}
                        className="flex-grow"
                        disabled
                      />
                      <span className="w-8 text-right text-sm">{temperature}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="max-tokens" className="block mb-1 text-sm font-medium">
                      Max Tokens
                    </label>
                    <Input
                      type="number"
                      id="max-tokens"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(Number(e.target.value))}
                      className="bg-[#1a2030] border-gray-700 text-white text-sm h-8"
                      disabled
                    />
                  </div>

                  <div>
                    <label htmlFor="system-prompt" className="block mb-1 text-sm font-medium">
                      System Prompt
                    </label>
                    <Textarea
                      id="system-prompt"
                      placeholder="Enter system prompt..."
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="bg-[#1a2030] border-gray-700 text-white h-24 resize-y text-sm"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Features Section - Full width with charts */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-green-400 mr-2" />
                  <h2 className="text-xl font-semibold">Pro Features</h2>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Unlock Advanced Capabilities
                </h2>
                <p className="text-gray-400 text-center mb-4">
                  Take your agents to the next level with our professional features
                </p>
                
                {/* Stats counters */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#1a2030] rounded-lg p-4 border border-gray-800 text-center">
                    <div className="flex justify-center mb-2 text-blue-500">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{userCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                  <div className="bg-[#1a2030] rounded-lg p-4 border border-gray-800 text-center">
                    <div className="flex justify-center mb-2 text-purple-500">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{conversationCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Conversations</div>
                  </div>
                  <div className="bg-[#1a2030] rounded-lg p-4 border border-gray-800 text-center">
                    <div className="flex justify-center mb-2 text-green-500">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-white">{agentCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Agents Created</div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="bg-[#1a2030] rounded-lg border border-gray-800 p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Growth Metrics</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#374151',
                            color: '#F3F4F6'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="conversations" 
                          stroke="#8B5CF6" 
                          fill="#8B5CF680" 
                          activeDot={{ r: 8 }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="users" 
                          stroke="#EC4899" 
                          fill="#EC489980" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {proFeatures.map((feature) => (
                    <div 
                      key={feature.id}
                      className="bg-[#1a2030] rounded-lg p-5 border border-gray-800"
                    >
                      <div className={`text-${feature.color}-400 mb-3`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{feature.name}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleUpgradeToPro}
                    className="bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] hover:from-[#C026D3] hover:to-[#7C3AED] text-white px-8 py-2"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Basic Agent Info */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold">Agent Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="agent-name" className="block mb-2 font-medium">
                    Agent Name
                  </label>
                  <Input
                    id="agent-name"
                    placeholder="E.g., Customer Support Bot"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="bg-[#1a2030] border-gray-700 text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="agent-description" className="block mb-2 font-medium">
                    Description
                  </label>
                  <Textarea
                    id="agent-description"
                    placeholder="What does your agent do?"
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    className="bg-[#1a2030] border-gray-700 text-white resize-none h-24"
                  />
                </div>

                <Button 
                  onClick={handleCreateAgent}
                  disabled={creatingAgent || !agentName.trim()}
                  className="w-full bg-[#1EAEDB] hover:bg-[#0EA5E9] text-white mt-4"
                >
                  {creatingAgent ? "Creating..." : "Create Agent"}
                </Button>
              </div>
            </div>

            {/* Test Interface */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold">Test Interface</h2>
              </div>
              <div className="p-6">
                {testResponse && (
                  <div className="mb-4 p-4 bg-[#1a2030] rounded-lg border border-gray-700 text-sm">
                    {testResponse}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Test your agent..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    className="bg-[#1a2030] border-gray-700 text-white"
                  />
                  <Button 
                    onClick={handleTestAgent}
                    className="bg-[#1a2030] hover:bg-[#2a3040] border border-gray-700 text-white"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>

            {/* Widget Code */}
            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold">Widget Code</h2>
              </div>
              <div className="p-6">
                <div className="bg-[#1a2030] p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-300 relative">
                  <pre>
{`<script>
  window.agentConfig = {
    agentId: "abc123",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.example.com/agent.js"></script>`}
                  </pre>
                  <Button 
                    className="absolute top-2 right-2 bg-transparent hover:bg-gray-700 p-1 h-auto"
                    onClick={() => {
                      navigator.clipboard.writeText(`<script>\n  window.agentConfig = {\n    agentId: "abc123",\n    position: "bottom-right"\n  };\n</script>\n<script src="https://cdn.example.com/agent.js"></script>`);
                      toast({
                        title: "Copied to clipboard",
                        description: "Widget code copied to clipboard",
                      });
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18M8 5C8 6.10457 8.89543 7 10 7H12C13.1046 7 14 6.10457 14 5M8 5C8 3.89543 8.89543 3 10 3H12C13.1046 3 14 3.89543 14 5M14 5H16C17.1046 5 18 5.89543 18 7V10M20 14H10M10 14L13 11M10 14L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Add this code to your website to embed the agent widget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBuilderFree;
