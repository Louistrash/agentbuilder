
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Settings2 } from "lucide-react";

export function FeatureOnboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to Agent Builder",
      description: "Create and customize AI agents for your needs",
      icon: <Bot className="w-6 h-6 text-[#1EAEDB]" />,
      preview: (
        <div className="bg-[#1C2128] rounded-lg p-4 border border-[#30363D] mt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1EAEDB]/10">
              <Bot className="w-5 h-5 text-[#1EAEDB]" />
            </div>
            <div>
              <h3 className="font-medium text-white">Get Started</h3>
              <p className="text-sm text-gray-400">Choose a template or start from scratch</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Configure Your Agent",
      description: "Customize behavior and responses",
      icon: <Settings2 className="w-6 h-6 text-[#1EAEDB]" />,
      preview: (
        <div className="bg-[#1C2128] rounded-lg p-4 border border-[#30363D] mt-4">
          <div className="space-y-4">
            <div className="h-2 bg-[#1EAEDB]/20 rounded-full w-3/4" />
            <div className="h-2 bg-[#1EAEDB]/20 rounded-full w-1/2" />
            <div className="h-2 bg-[#1EAEDB]/20 rounded-full w-2/3" />
          </div>
        </div>
      )
    },
    {
      title: "Test and Deploy",
      description: "Try out your agent before going live",
      icon: <MessageSquare className="w-6 h-6 text-[#1EAEDB]" />,
      preview: (
        <div className="bg-[#1C2128] rounded-lg p-4 border border-[#30363D] mt-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1EAEDB]/20" />
              <div className="flex-1 h-8 bg-[#30363D] rounded-lg" />
            </div>
            <div className="flex gap-3 justify-end">
              <div className="flex-1 h-8 bg-[#1EAEDB]/20 rounded-lg" />
              <div className="w-8 h-8 rounded-full bg-[#1EAEDB]/20" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
      navigate('/agent-builder/free');
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    setCurrentStep(0);
    navigate('/agent-builder/free');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#1C2128] border-[#30363D] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
            {steps[currentStep].icon}
            {steps[currentStep].title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-gray-400 text-lg">
            {steps[currentStep].description}
          </p>
          
          {steps[currentStep].preview}
          
          <div className="flex gap-2 mt-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-[#1EAEDB]' : 'bg-[#30363D]'
                }`}
              />
            ))}
          </div>
        </div>

        <DialogFooter className="mt-8">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="text-gray-400 hover:text-white hover:bg-[#30363D] border-[#30363D]"
            >
              Skip Tour
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
            >
              {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
