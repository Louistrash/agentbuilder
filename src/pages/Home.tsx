
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LearnMoreDialog } from '@/components/home/LearnMoreDialog';

// Define content for the learn more dialogs
const learnMoreContent = {
  build: {
    title: "Build Your First Agent",
    description: "Learn how to create your own AI chat agent",
    content: null
  },
  responses: {
    title: "Smart AI Responses",
    description: "How our AI technology works",
    content: null
  },
  analytics: {
    title: "Analytics & Insights",
    description: "Track and improve your chat agents",
    content: null
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [dialogContent, setDialogContent] = useState<keyof typeof learnMoreContent | null>(null);

  const openDialog = (contentKey: keyof typeof learnMoreContent) => {
    setDialogContent(contentKey);
  };

  const closeDialog = () => {
    setDialogContent(null);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col bg-[#0b0f19]">
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
          <div className="bg-[#0f1623] border border-[#1a2030] rounded-xl p-8 flex flex-col">
            <div className="mb-6 bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Easy to Build</h3>
            <p className="text-gray-400 mb-4">
              Create custom chat agents with our intuitive builder interface. No coding required.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Try our drag-and-drop interface and see how easy it is to create your first AI agent.
            </p>
            <Button 
              variant="ghost" 
              className="mt-auto text-indigo-400 hover:text-indigo-300 border border-[#1a2030] hover:bg-indigo-900/20 flex items-center justify-center gap-2"
              onClick={() => openDialog('build')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Smart Responses */}
          <div className="bg-[#0f1623] border border-[#1a2030] rounded-xl p-8 flex flex-col">
            <div className="mb-6 bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Smart Responses</h3>
            <p className="text-gray-400 mb-4">
              Leverage advanced AI to provide intelligent and contextual responses to user queries.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Experience real-time AI responses powered by cutting-edge language models.
            </p>
            <Button 
              variant="ghost" 
              className="mt-auto text-blue-400 hover:text-blue-300 border border-[#1a2030] hover:bg-blue-900/20 flex items-center justify-center gap-2"
              onClick={() => openDialog('responses')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Analytics & Insights */}
          <div className="bg-[#0f1623] border border-[#1a2030] rounded-xl p-8 flex flex-col">
            <div className="mb-6 bg-cyan-900/30 w-12 h-12 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Analytics & Insights</h3>
            <p className="text-gray-400 mb-4">
              Track performance and gather insights to continuously improve your chat agents.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              View sample analytics and see how you can optimize your chat agents.
            </p>
            <Button 
              variant="ghost" 
              className="mt-auto text-cyan-400 hover:text-cyan-300 border border-[#1a2030] hover:bg-cyan-900/20 flex items-center justify-center gap-2"
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

export default Home;
