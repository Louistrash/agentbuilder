
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Create handler functions for button clicks with console logging
  const handleBuildAgentClick = () => {
    console.log("Navigating to agent builder");
    navigate('/agent-builder/free');
  };

  const handleLearnMoreClick = (path: string) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
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
              onClick={handleBuildAgentClick}
              className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <span className="text-xl">+</span> Build your First Agent (Free)
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-6 h-auto bg-white/5 text-white border-white/10 hover:bg-white/10"
            >
              Sign In
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
              onClick={() => handleLearnMoreClick('/learn/build')}
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
              onClick={() => handleLearnMoreClick('/learn/responses')}
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
              onClick={() => handleLearnMoreClick('/learn/analytics')}
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
