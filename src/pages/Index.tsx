
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    console.log("Navigating to agent builder free");
    navigate('/agent-builder/free');
  };
  
  const handleSignIn = () => {
    console.log("Navigating to auth page");
    navigate('/auth');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent animate-gradient-flow">
            Build Intelligent Chat Agents
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            Create, deploy, and manage AI-powered chat agents that engage with your users in natural conversation.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700 flex items-center"
            >
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              onClick={handleSignIn}
              variant="outline" 
              className="text-lg px-8 py-6 h-auto bg-black/20 text-white border-white/10 hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </div>
        
        <div className="mt-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <img 
            src="/public/lovable-uploads/b3cdae9e-766a-4a2f-b1ca-faaf1c22d2a4.png" 
            alt="Chat Agent Builder Interface" 
            className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl border border-white/10" 
          />
        </div>

        {/* Feature section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Natural Conversations</h3>
            <p className="text-gray-400">Create AI agents that engage users in natural, human-like conversations.</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Easy Customization</h3>
            <p className="text-gray-400">Customize your chat agents to match your brand and specific use cases.</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Multi-platform Support</h3>
            <p className="text-gray-400">Deploy your chat agents across websites, mobile apps, and messaging platforms.</p>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="mt-32 text-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to transform your customer interactions?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Join thousands of businesses already using our AI chat agents to deliver exceptional customer experiences.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center mx-auto"
          >
            Start Building Today
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
