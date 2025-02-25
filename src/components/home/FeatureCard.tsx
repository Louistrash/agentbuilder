
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeatureCardProps {
  feature: string;
  title: string;
  description: string;
  demoContent: string;
  icon: React.ReactNode;
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isClicked: boolean;
  gradientClasses: string;
  customAnimation?: React.ReactNode;
}

export function FeatureCard({
  feature,
  title,
  description,
  demoContent,
  icon,
  onClick,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isClicked,
  gradientClasses,
  customAnimation
}: FeatureCardProps) {
  const getCardClassName = () => {
    const baseClasses = "p-6 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer transform";
    const hoverClasses = isHovered ? "border-white/30 translate-y-[-4px]" : "hover:border-white/20 hover:translate-y-[-2px]";
    const clickedClasses = isClicked ? "scale-95 opacity-75" : "";
    return `${baseClasses} ${hoverClasses} ${clickedClasses}`;
  };

  return (
    <Card
      className={getCardClassName()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`relative mb-6 h-40 ${gradientClasses} rounded-lg flex items-center justify-center overflow-hidden`}>
        {customAnimation || icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">{demoContent}</p>
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onClick}
      >
        <Play className="h-4 w-4 mr-2" />
        Try it out
      </Button>
    </Card>
  );
}
