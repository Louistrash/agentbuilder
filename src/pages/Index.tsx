
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FeatureCard } from '@/components/home/FeatureCard';
import { ProFeatures } from '@/components/home/ProFeatures';
import { useTokens } from '@/context/TokenContext';
import { ArrowRightIcon, Bot, BrainCircuit, GemIcon, Key, MessageSquareText, Sparkles, Users } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { tokens, displayTokens } = useTokens();
  const [startingTokens, setStartingTokens] = useState(0);

  useEffect(() => {
    setStartingTokens(tokens);
  }, [tokens]);

  const features = [
    {
      title: 'AI-Powered Conversations',
      description: 'Create intelligent agents that can engage in natural, human-like conversations with your users.',
      icon: MessageSquareText,
      color: '#3B82F6',
    },
    {
      title: 'Customizable Agents',
      description: 'Tailor your AI agents to match your brand voice, expertise, and specific use cases.',
      icon: Bot,
      color: '#10B981',
    },
    {
      title: 'No-Code Builder',
      description: 'Create and deploy AI agents without writing a single line of code.',
      icon: Sparkles,
      color: '#A855F7',
    },
    {
      title: 'Advanced Analytics',
      description: 'Get insights into how users are interacting with your AI agents.',
      icon: BrainCircuit,
      color: '#EC4899',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 bg-[#1A1F2C] rounded-full text-sm font-medium text-blue-400 mb-6">
            <GemIcon className="h-4 w-4 mr-2" />
            <span>{displayTokens} tokens available</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Build AI Agents in Minutes
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-8">
            Create, deploy, and manage conversational AI agents without coding. Perfect for customer support, lead generation, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300"
              onClick={() => navigate('/agent-builder')}
            >
              Create Your Agent
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800 font-medium px-8 py-3 rounded-xl transition-colors"
              onClick={() => navigate('/auth')}
            >
              Sign Up Free
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Powerful Features, <span className="text-purple-400">Simple Interface</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            ))}
          </div>
        </div>

        {/* Pro Features Section */}
        <ProFeatures />

        {/* Getting Started Section */}
        <div className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Ready to <span className="text-blue-400">Get Started?</span>
          </h2>
          <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#161B22] border-[#30363D] shadow-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="p-3 bg-blue-500/10 rounded-lg w-fit mb-4">
                      <Users className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
                    <p className="text-sm text-gray-400 mb-4 flex-grow">Create a free account and get started with 50 tokens for testing.</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#30363D] hover:bg-[#30363D] transition-colors"
                      onClick={() => navigate('/auth')}
                    >
                      Create Account
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#161B22] border-[#30363D] shadow-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
                      <Bot className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Build Your Agent</h3>
                    <p className="text-sm text-gray-400 mb-4 flex-grow">Choose a template or start from scratch to create your custom AI agent.</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#30363D] hover:bg-[#30363D] transition-colors"
                      onClick={() => navigate('/agent-builder')}
                    >
                      Start Building
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#161B22] border-[#30363D] shadow-xl">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="p-3 bg-pink-500/10 rounded-lg w-fit mb-4">
                      <Key className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Deploy & Share</h3>
                    <p className="text-sm text-gray-400 mb-4 flex-grow">Get an API key or embed code to add your agent to any website or app.</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#30363D] hover:bg-[#30363D] transition-colors"
                    >
                      View Documentation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Start Building <span className="text-blue-400">Today</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of businesses using our platform to create intelligent AI agents.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300"
            onClick={() => navigate('/agent-builder')}
          >
            Create Your First Agent
          </Button>
        </div>
      </div>
    </div>
  );
}
