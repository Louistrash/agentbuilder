
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Rocket, MessageSquare, ChartBar } from "lucide-react";

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
        description: "Start with a pre-built template or create from scratch.",
        icon: <Rocket className="h-8 w-8 text-blue-400" />
      },
      {
        title: "Configure Behavior",
        description: "Set up how your agent responds and interacts.",
        icon: <MessageSquare className="h-8 w-8 text-blue-400" />
      },
      {
        title: "Test and Deploy",
        description: "Try out your agent and make it live.",
        icon: <Rocket className="h-8 w-8 text-blue-400" />
      }
    ]
  },
  smart: {
    title: "Create Smart Responses",
    steps: [
      {
        title: "Train Your Agent",
        description: "Upload documents or write custom responses.",
        icon: <MessageSquare className="h-8 w-8 text-green-400" />
      },
      {
        title: "Define Contexts",
        description: "Set up different scenarios for your agent.",
        icon: <MessageSquare className="h-8 w-8 text-green-400" />
      },
      {
        title: "Fine-tune Responses",
        description: "Adjust the tone and style of your agent.",
        icon: <MessageSquare className="h-8 w-8 text-green-400" />
      }
    ]
  },
  analytics: {
    title: "Set Up Analytics",
    steps: [
      {
        title: "Enable Tracking",
        description: "Choose which metrics to monitor.",
        icon: <ChartBar className="h-8 w-8 text-orange-400" />
      },
      {
        title: "Create Dashboard",
        description: "Customize your analytics view.",
        icon: <ChartBar className="h-8 w-8 text-orange-400" />
      },
      {
        title: "Set Goals",
        description: "Define success metrics for your agent.",
        icon: <ChartBar className="h-8 w-8 text-orange-400" />
      }
    ]
  }
};

export function FeatureOnboarding({ feature, isOpen, onClose }: FeatureOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const content = featureContent[feature as keyof typeof featureContent];

  const handleNext = () => {
    if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex items-center mb-4">
            {content.steps[currentStep].icon}
            <h3 className="text-lg font-medium ml-3">
              {content.steps[currentStep].title}
            </h3>
          </div>
          <p className="text-gray-500">
            {content.steps[currentStep].description}
          </p>
          
          {/* Progress indicators */}
          <div className="flex gap-2 mt-6 mb-4">
            {content.steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-primary' : 'bg-gray-200'
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
            >
              Skip
            </Button>
            <Button onClick={handleNext}>
              {currentStep < content.steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
