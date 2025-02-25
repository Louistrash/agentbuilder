
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
  {
    title: "Welcome to Agent Builder",
    content: "Let's walk through how to create your first AI agent.",
    target: "body"
  },
  {
    title: "Choose a Template",
    content: "Start by selecting a template or create a custom agent from scratch.",
    target: ".templates-section"
  },
  {
    title: "Configure Your Agent",
    content: "Customize the agent's behavior using the configuration options.",
    target: ".configuration-section"
  },
  {
    title: "Test Your Agent",
    content: "Try out your agent in the testing interface before saving.",
    target: ".test-interface"
  }
];

export function TutorialOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  // Check if this is the user's first visit
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenAgentTutorial');
    if (hasSeenTutorial) {
      setShowTutorial(false);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenAgentTutorial', 'true');
    setShowTutorial(false);
  };

  if (!showTutorial) return null;

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{currentTutorialStep.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {currentTutorialStep.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleComplete}>
            Skip Tutorial
          </Button>
          <Button onClick={handleNext}>
            {currentStep < tutorialSteps.length - 1 ? "Next" : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
