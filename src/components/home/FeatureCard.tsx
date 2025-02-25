
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="scale-[1.14]" // 14% size increase
    >
      <Card
        className={`${bgColor} rounded-xl border border-[#9b87f5]/10 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#9b87f5]/5 backdrop-blur-sm`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#9b87f5]/5 to-transparent pointer-events-none" />
          
          <div className={`p-6 flex items-center justify-center relative z-10`}>
            <div className="h-12 w-12 rounded-lg bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5]">
              {icon}
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-4 relative z-10">
          <h3 className="text-lg font-medium text-white">
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
            className="w-full mt-2 bg-black/20 border border-[#9b87f5]/20 text-gray-300 hover:bg-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={onClick}
          >
            <Play className="h-4 w-4 mr-2" />
            Try it out
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
