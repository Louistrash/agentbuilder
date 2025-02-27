
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Build Intelligent Chat Agents
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto">
            Create, deploy, and manage AI-powered chat agents that engage with your users in natural conversation.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/agent-builder/free')}
              className="text-lg px-8 py-6 h-auto bg-blue-600 hover:bg-blue-700"
            >
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline" 
              className="text-lg px-8 py-6 h-auto bg-white/5 text-white border-white/10 hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </div>
        
        <div className="mt-20">
          <img 
            src="/public/lovable-uploads/9ed71e91-82ac-473f-8da6-3ed7365b5bd0.png" 
            alt="Chat Agent Builder Interface" 
            className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl border border-white/10" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
