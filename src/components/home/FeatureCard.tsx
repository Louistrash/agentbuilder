
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
      className={`p-4 sm:p-6 ${bgColor} rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`${gradientClasses} rounded-lg h-32 sm:h-40 mb-4 sm:mb-6 flex items-center justify-center transition-all duration-500`}
      >
        <div className={`transform transition-all duration-300 ${getIconAnimation(feature)}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 transition-colors duration-300 hover:text-blue-400">{title}</h3>
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm">{description}</p>
      <p className="text-gray-500 mb-4 sm:mb-6 text-xs sm:text-sm">{demoContent}</p>
      <Button
        variant="outline"
        className={`w-full border-gray-700 text-gray-300 hover:bg-gray-800 h-9 sm:h-10 text-sm transition-all duration-300 ${
          isHovered ? 'bg-gray-800 border-gray-600' : ''
        }`}
        onClick={onClick}
      >
        <Play className={`h-3 w-3 sm:h-4 sm:w-4 mr-2 transition-transform duration-300 ${
          isHovered ? 'transform translate-x-1' : ''
        }`} />
        Try it out
      </Button>
    </Card>
  );
}
