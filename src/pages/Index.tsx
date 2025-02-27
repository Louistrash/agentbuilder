
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, BarChart3, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LearnMoreDialog } from '@/components/home/LearnMoreDialog';

// Define content for the learn more dialogs
const learnMoreContent = {
  build: {
    title: "Easy to Build Chat Agents",
    description: "Create custom agents without coding",
    content: (
      <div className="space-y-4">
        <p>Our intuitive builder interface makes it easy to create custom chat agents without any coding knowledge.</p>
        <p>You can:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Choose from pre-built templates</li>
          <li>Customize agent personality and responses</li>
          <li>Add knowledge sources for your agent</li>
          <li>Test your agent in real-time</li>
          <li>Deploy with a single click</li>
        </ul>
        <p className="mt-4 text-indigo-400">Start with our free builder and upgrade to pro when you need advanced features.</p>
      </div>
    )
  },
  responses: {
    title: "Smart AI Responses",
    description: "How our AI technology works",
    content: (
      <div className="space-y-4">
        <p>Our chat agents use advanced AI technology to provide intelligent and contextual responses to user queries.</p>
        <p>Key features include:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Natural language understanding</li>
          <li>Context awareness across conversations</li>
          <li>Customizable response styles</li>
          <li>Multi-turn conversation handling</li>
          <li>Integration with your knowledge base</li>
        </ul>
        <p className="mt-4 text-blue-400">Our AI is built on the latest language models and optimized for responsiveness and accuracy.</p>
      </div>
    )
  },
  analytics: {
    title: "Analytics & Insights",
    description: "Track and improve your chat agents",
    content: (
      <div className="space-y-4">
        <p>Gain valuable insights into how users interact with your chat agents and use that data to continuously improve.</p>
        <p>Our analytics platform provides:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>User engagement metrics</li>
          <li>Conversation flow analysis</li>
          <li>Common questions and topics</li>
          <li>Satisfaction scores</li>
          <li>Performance benchmarks</li>
        </ul>
        <p className="mt-4 text-cyan-400">Use these insights to optimize your agents, improve user satisfaction, and achieve your goals.</p>
      </div>
    )
  }
};

const Index = () => {
  const navigate = useNavigate();
  const [dialogContent, setDialogContent] = useState<keyof typeof learnMoreContent | null>(null);

  const openDialog = (contentKey: keyof typeof learnMoreContent) => {
    setDialogContent(contentKey);
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Create Intelligent Chat Agents
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            Try out our free agent builder. Create and test AI agents without signing in. You'll only need
            to sign in when you want to save your work!
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/agent-builder/free')}
              className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <span className="text-xl">+</span> Build your First Agent (Free)
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {/* Easy to Build */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy to Build</h3>
            <p className="text-gray-400 mb-4">
              Create custom chat agents with our intuitive builder interface. No coding required.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Try our drag-and-drop interface and see how easy it is to create your first AI agent.
            </p>
            <Button 
              variant="ghost" 
              className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 border border-indigo-900/50 mt-auto flex items-center gap-2"
              onClick={() => openDialog('build')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Smart Responses */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Responses</h3>
            <p className="text-gray-400 mb-4">
              Leverage advanced AI to provide intelligent and contextual responses to user queries.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Experience real-time AI responses powered by cutting-edge language models.
            </p>
            <Button 
              variant="ghost" 
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border border-blue-900/50 mt-auto flex items-center gap-2"
              onClick={() => openDialog('responses')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Analytics & Insights */}
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics & Insights</h3>
            <p className="text-gray-400 mb-4">
              Track performance and gather insights to continuously improve your chat agents.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              View sample analytics and see how you can optimize your chat agents.
            </p>
            <Button 
              variant="ghost" 
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-900/30 border border-cyan-900/50 mt-auto flex items-center gap-2"
              onClick={() => openDialog('analytics')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog for Learn More content */}
      {dialogContent && (
        <LearnMoreDialog
          isOpen={!!dialogContent}
          onClose={closeDialog}
          title={learnMoreContent[dialogContent].title}
          description={learnMoreContent[dialogContent].description}
          content={learnMoreContent[dialogContent].content}
        />
      )}
    </div>
  );
};

export default Index;
