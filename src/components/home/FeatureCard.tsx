
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
  const getIconAnimation = (feature: string) => {
    switch(feature) {
      case 'build':
        return isHovered ? 'scale-110 animate-bounce' : 'animate-pulse';
      case 'smart':
        return isHovered ? 'scale-125' : 'animate-pulse';
      case 'analytics':
        return isHovered ? 'scale-110 rotate-12' : '';
      default:
        return '';
    }
  };

  return (
    <Card
      className={`relative group p-5 ${bgColor} rounded-2xl border border-gray-800 hover:border-gray-700/50 transition-all duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`${gradientClasses} rounded-xl h-24 sm:h-32 lg:h-40 mb-5 flex items-center justify-center transition-all duration-500`}
      >
        <div className={`transform transition-all duration-300 ${getIconAnimation(feature)}`}>
          {icon}
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-300 group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
        <p className="text-gray-500 text-xs leading-relaxed">
          {demoContent}
        </p>
        <Button
          variant="outline"
          className={`w-full mt-2 border-gray-700/50 text-gray-300 hover:bg-gray-800/80 h-9 text-xs sm:text-sm transition-all duration-300 ${
            isHovered ? 'bg-gray-800/60 border-gray-600/50' : ''
          }`}
          onClick={onClick}
        >
          <Play className={`h-3 w-3 mr-2 transition-transform duration-300 ${
            isHovered ? 'transform translate-x-1' : ''
          }`} />
          Try it out
        </Button>
      </div>
    </Card>
  );
}
