
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
  bgColor: string;
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
  bgColor
}: FeatureCardProps) {
  return (
    <Card
      className={`${bgColor} rounded-2xl border-[#9b87f5]/10 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#9b87f5]/5 animate-fade-up`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${gradientClasses} p-8 flex items-center justify-center transition-transform duration-300 transform hover:scale-105`}>
        {icon}
      </div>
      
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">
          {demoContent}
        </p>
        <Button
          variant="outline"
          className="w-full mt-2 bg-transparent border border-[#9b87f5]/20 text-gray-300 hover:bg-[#9b87f5]/10 hover:border-[#9b87f5]/30 h-9 text-sm transition-all duration-300 transform hover:scale-[1.02]"
          onClick={onClick}
        >
          <Play className="h-3 w-3 mr-2" />
          Try it out
        </Button>
      </div>
    </Card>
  );
}
