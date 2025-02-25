
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Sparkles, Zap, MessageSquare, BarChart3, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function ProFeatures() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Advanced Chat Features",
      description: "Multi-turn conversations, context awareness, and customizable personalities"
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Detailed Analytics",
      description: "Track user engagement, conversation metrics, and performance insights"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing systems via our REST API"
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Multi-Channel Support",
      description: "Deploy across web, mobile, and messaging platforms"
    }
  ];

  return (
    <div className="mt-16 sm:mt-24 px-4 sm:px-0">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-1 bg-[#9b87f5]/10 rounded-full text-sm font-medium text-[#9b87f5] mb-4">
          <Sparkles className="h-4 w-4 mr-2" />
          Pro Features
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
          Unlock Advanced Capabilities
        </h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Take your chat agents to the next level with our professional features
        </p>
      </div>

      <Card className="p-4 sm:p-8 bg-[#1A1F2C] border border-[#9b87f5]/10 rounded-2xl overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9b87f5]/5 to-transparent pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-8 items-start relative z-10">
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-black/20 border border-[#9b87f5]/10 backdrop-blur-sm"
                >
                  <div className="h-8 w-8 rounded-lg bg-[#9b87f5]/10 flex items-center justify-center text-[#9b87f5] mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            <Button 
              onClick={() => navigate('/auth?plan=pro')}
              className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#8b77e5] text-white transition-all duration-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-black/40 border border-[#9b87f5]/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse mb-4">
                    <Sparkles className="h-8 w-8 text-[#9b87f5]" />
                  </div>
                  <p className="text-sm text-gray-400">Interactive demo coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
