
import React, { useState, useEffect } from 'react';
import { Bot, Lock, Sparkles, Zap, BarChart3, MessageCircle, Code, Wifi, Users, TrendingUp } from "lucide-react";
import { AgentsList } from "@/components/agent/AgentsList";
import { AgentTemplates } from "@/components/agent/AgentTemplates";
import { AdvancedConfig } from "@/components/agent/AdvancedConfig";
import { TestInterface } from "@/components/agent/TestInterface";
import { WidgetCode } from "@/components/agent/WidgetCode";
import { FeatureOnboarding } from "@/components/onboarding/FeatureOnboarding";
import { TutorialOverlay } from "@/components/onboarding/TutorialOverlay";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const generateRandomData = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function AgentBuilder() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Initialize analytics data
    const initialData = Array.from({length: 7}, (_, i) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      users: generateRandomData(100, 200),
      engagement: generateRandomData(60, 90),
      messages: generateRandomData(300, 500)
    }));
    setData(initialData);

    // Update data periodically
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData];
        newData.forEach(item => {
          item.users += generateRandomData(-10, 20);
          item.engagement += generateRandomData(-5, 10);
          item.messages += generateRandomData(-20, 40);
        });
        return [...newData];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const proFeatures = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Advanced Chat Features",
      description: "Multi-turn conversations, context awareness, and customizable personalities"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Detailed Analytics",
      description: "Track user engagement, conversation metrics, and performance insights"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing systems via our REST API"
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Multi-Channel Support",
      description: "Deploy across web, mobile, and messaging platforms"
    }
  ];

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
    setIsConfiguring(true);
  };

  const handleAgentSave = (agentConfig) => {
    console.log('Agent configuration saved:', agentConfig);
    setIsConfiguring(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="space-y-8">
          {/* Header Section with Pro Badge */}
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#1EAEDB]/10">
                  <Bot className="w-5 h-5 text-[#1EAEDB]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Agent Builder</h1>
                  <p className="text-gray-400 mt-1">Create and customize your AI agents</p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/auth?plan=pro')}
                className="hidden sm:flex items-center gap-2 bg-[#1EAEDB]/10 hover:bg-[#1EAEDB]/20 text-[#1EAEDB]"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1EAEDB]/5 via-transparent to-[#0FA0CE]/5"></div>
              <div className="relative">
                <AgentTemplates />
              </div>
            </div>
          </div>

          {/* Pro Features Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 overflow-hidden"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-1 bg-[#1EAEDB]/10 rounded-full text-sm font-medium text-[#1EAEDB] mb-4">
                <Lock className="h-4 w-4 mr-2" />
                Pro Features
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-white via-[#1EAEDB] to-[#0FA0CE] bg-clip-text text-transparent">
                Unlock Advanced Capabilities
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Take your agents to the next level with our professional features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {proFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-black/20 border border-[#1EAEDB]/10 backdrop-blur-sm"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[#1EAEDB]/10 flex items-center justify-center text-[#1EAEDB] mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-black/40 border border-[#1EAEDB]/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-300">User Engagement</h4>
                    <TrendingUp className="h-4 w-4 text-[#1EAEDB]" />
                  </div>
                  <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                        <XAxis dataKey="name" stroke="#555555" />
                        <YAxis stroke="#555555" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#222222',
                            border: '1px solid rgba(30, 174, 219, 0.1)',
                            borderRadius: '8px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="engagement"
                          stroke="#1EAEDB"
                          fill="url(#colorEngagement)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="p-4 rounded-xl bg-black/40 border border-[#1EAEDB]/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-4 w-4 text-[#1EAEDB]" />
                      <span className="text-xs text-gray-400">Active Users</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{data[6]?.users || 0}</h3>
                    <span className="text-xs text-[#1EAEDB]">+12.5% this week</span>
                  </motion.div>

                  <motion.div
                    className="p-4 rounded-xl bg-black/40 border border-[#1EAEDB]/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <MessageCircle className="h-4 w-4 text-[#1EAEDB]" />
                      <span className="text-xs text-gray-400">Messages/Day</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{data[6]?.messages || 0}</h3>
                    <span className="text-xs text-[#1EAEDB]">+8.3% this week</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Agents List</h2>
                </div>
                <div className="p-6">
                  <AgentsList />
                </div>
              </div>
              
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Advanced Configuration</h2>
                </div>
                <div className="p-6">
                  <AdvancedConfig />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Test Interface</h2>
                </div>
                <div className="p-6">
                  <TestInterface />
                </div>
              </div>

              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#1C2128] p-4">
                  <h2 className="text-lg font-semibold text-white">Widget Code</h2>
                </div>
                <div className="p-6">
                  <WidgetCode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureOnboarding />
      <TutorialOverlay />
    </div>
  );
}
