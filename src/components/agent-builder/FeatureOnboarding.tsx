
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, MessageSquare, ChartBar, LineChart, UserCheck, BrainCircuit } from "lucide-react";

interface FeatureOnboardingProps {
  feature: string;
  isOpen: boolean;
  onClose: () => void;
}

const featureContent = {
  build: {
    title: "Build Your First Agent",
    steps: [
      {
        title: "Choose a Template",
        description: "Get started quickly with pre-built templates for customer service, sales, or support.",
        icon: <Rocket className="h-8 w-8 text-blue-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
                <UserCheck className="h-8 w-8 text-blue-400 mb-2" />
                <h4 className="font-medium mb-1">Customer Service</h4>
                <p className="text-sm text-gray-400">Handle customer inquiries 24/7</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
                <BrainCircuit className="h-8 w-8 text-green-400 mb-2" />
                <h4 className="font-medium mb-1">Sales Assistant</h4>
                <p className="text-sm text-gray-400">Convert leads automatically</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Configure Behavior",
        description: "Set up how your agent responds and interacts.",
        icon: <MessageSquare className="h-8 w-8 text-blue-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <label className="text-sm text-gray-400 mb-2 block">Agent Personality</label>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-blue-500/20">Professional</Button>
                  <Button size="sm" variant="ghost">Friendly</Button>
                  <Button size="sm" variant="ghost">Technical</Button>
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <label className="text-sm text-gray-400 mb-2 block">Response Style</label>
                <div className="h-2 bg-blue-500/30 rounded-full" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Test and Deploy",
        description: "Try out your agent and make it live.",
        icon: <Rocket className="h-8 w-8 text-blue-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-green-500">Agent Online</span>
              </div>
              <Button size="sm" variant="secondary">Preview Chat</Button>
            </div>
            <div className="h-24 border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">Chat Preview Area</span>
            </div>
          </div>
        )
      }
    ]
  },
  smart: {
    title: "Experience Smart Responses",
    steps: [
      {
        title: "Natural Language Understanding",
        description: "Watch how the agent understands context and intent.",
        icon: <MessageSquare className="h-8 w-8 text-green-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-sm">How do I create a new account?</p>
                </div>
              </div>
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-green-500/20 rounded-lg p-3">
                  <p className="text-sm">I'll help you create a new account. First, click the "Sign Up" button in the top right corner...</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Context Awareness",
        description: "The agent remembers conversation history.",
        icon: <BrainCircuit className="h-8 w-8 text-green-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-sm">What's my account status?</p>
                </div>
              </div>
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-green-500/20 rounded-lg p-3">
                  <p className="text-sm">Based on our previous conversation, I can see you just created your account. Your account is active and you're on the free trial plan...</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Multi-turn Conversations",
        description: "Handle complex, multi-step interactions.",
        icon: <MessageSquare className="h-8 w-8 text-green-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-3 border-l-2 border-green-500">
                <p className="text-xs text-gray-400 mb-1">Previous Context</p>
                <p className="text-sm">User is setting up 2FA authentication</p>
              </div>
              <div className="flex gap-3 items-start justify-end">
                <div className="bg-green-500/20 rounded-lg p-3">
                  <p className="text-sm">Great! Now that you've entered your phone number, I'll send you a verification code...</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 flex-shrink-0" />
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  analytics: {
    title: "Analytics & Insights Preview",
    steps: [
      {
        title: "Conversation Analytics",
        description: "Track chat volumes and response times.",
        icon: <ChartBar className="h-8 w-8 text-orange-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Chat Volume</h4>
                <span className="text-green-500 text-sm">↑ 12%</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[40, 25, 35, 45, 30, 48, 52].map((height, i) => (
                  <div key={i} className="bg-orange-500/20 rounded-sm" style={{ height: `${height}px` }} />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mon</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Performance Metrics",
        description: "Monitor key success indicators.",
        icon: <LineChart className="h-8 w-8 text-orange-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Response Time</span>
                  <span className="text-green-500 text-sm">2.3s avg</span>
                </div>
                <div className="h-2 bg-green-500 rounded-full w-3/4" />
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Resolution Rate</span>
                  <span className="text-orange-500 text-sm">89%</span>
                </div>
                <div className="h-2 bg-orange-500 rounded-full w-4/5" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "User Satisfaction",
        description: "Track customer happiness scores.",
        icon: <ChartBar className="h-8 w-8 text-orange-400" />,
        preview: (
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">CSAT Score</h4>
                <span className="text-green-500 text-sm">4.8/5.0</span>
              </div>
              <div className="flex gap-2">
                {[95, 88, 92, 96, 90].map((score, i) => (
                  <div key={i} className="flex-1">
                    <div className="h-24 bg-gray-800 rounded-t-lg relative">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-orange-500/30 rounded-t-lg"
                        style={{ height: `${score}%` }}
                      />
                    </div>
                    <div className="text-xs text-center mt-1 text-gray-500">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    ]
  }
} as const;

type FeatureType = keyof typeof featureContent;

export function FeatureOnboarding({ feature, isOpen, onClose }: FeatureOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  // Early return if feature is not valid
  if (!feature || !(feature in featureContent)) {
    return null;
  }

  const content = featureContent[feature as FeatureType];

  const handleNext = () => {
    if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // When reaching the last step and clicking "Get Started", 
      // navigate to the free agent builder page
      setCurrentStep(0); // Reset for next time
      onClose();
      navigate('/agent-builder/free');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setCurrentStep(0); // Reset when dialog closes
      onClose();
    }}>
      <DialogContent className="bg-[#1A1F2C] border-gray-700 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {content.steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center mb-4">
            {content.steps[currentStep].icon}
            <h3 className="text-lg font-medium ml-3">
              {content.steps[currentStep].title}
            </h3>
          </div>
          
          <div className="my-6">
            {content.steps[currentStep].preview}
          </div>
          
          {/* Progress indicators */}
          <div className="flex gap-2 mt-6 mb-4">
            {content.steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-[#1EAEDB]' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Skip
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white"
            >
              {currentStep < content.steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
