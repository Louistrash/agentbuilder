
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
      className={`${bgColor} rounded-2xl border-0 overflow-hidden transition-all duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${gradientClasses} p-8 flex items-center justify-center`}>
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
          className="w-full mt-2 bg-transparent border border-gray-700/50 text-gray-300 hover:bg-gray-800/50 hover:border-gray-600 h-9 text-sm"
          onClick={onClick}
        >
          <Play className="h-3 w-3 mr-2" />
          Try it out
        </Button>
      </div>
    </Card>
  );
}
