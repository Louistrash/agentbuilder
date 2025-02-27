
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LearnMoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  content: React.ReactNode;
}

export function LearnMoreDialog({
  isOpen,
  onClose,
  title,
  description,
  content
}: LearnMoreDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Reset and close on the last step
      setCurrentStep(1);
      onClose();
    }
  };

  const handleSkip = () => {
    setCurrentStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setCurrentStep(1);
        onClose();
      }
    }}>
      <DialogContent className="bg-gray-900 border border-white/10 text-white sm:max-w-xl p-0 overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {currentStep === 1 ? "Choose a Template" : 
                 currentStep === 2 ? "Customize Your Agent" : "Deploy and Share"}
              </h3>
              <p className="text-gray-400 text-lg">
                {currentStep === 1 ? "Get started quickly with pre-built templates for customer service, sales, or support." : 
                 currentStep === 2 ? "Personalize your agent's appearance, responses, and knowledge base." : 
                 "Share your agent via link, embed on your website, or integrate with your existing tools."}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-5 cursor-pointer hover:bg-gray-700 transition duration-200">
                  <div className="text-blue-400 mb-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Customer Service</h4>
                  <p className="text-gray-400">Handle customer inquiries 24/7</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-5 cursor-pointer hover:bg-gray-700 transition duration-200">
                  <div className="text-green-400 mb-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">Sales Assistant</h4>
                  <p className="text-gray-400">Convert leads automatically</p>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Personalize Your Agent</h4>
                  <p className="text-gray-400">Add a name, profile picture, and description for your agent. Define its personality and tone.</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Add Knowledge</h4>
                  <p className="text-gray-400">Upload documents, connect to your website, or add FAQs to give your agent the information it needs.</p>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Share with Others</h4>
                  <p className="text-gray-400">Generate a shareable link to your agent that you can send to anyone.</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Embed on Website</h4>
                  <p className="text-gray-400">Add a simple code snippet to your website to integrate your chat agent.</p>
                </div>
              </div>
            )}
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(totalSteps)].map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full ${index + 1 === currentStep ? 'w-12 bg-white' : 'w-8 bg-gray-600'}`}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6"
            >
              {currentStep === totalSteps ? "Finish" : "Next"}
            </Button>
          </div>
        </div>

        <DialogClose asChild className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
