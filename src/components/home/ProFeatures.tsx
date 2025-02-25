
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Sparkles, Zap, MessageSquare, BarChart3, Wifi, TrendingUp, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useEffect } from "react";

const generateRandomData = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function ProFeatures() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Initialize data
    const initialData = Array.from({ length: 7 }, (_, i) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      users: generateRandomData(100, 200),
      engagement: generateRandomData(60, 90),
      messages: generateRandomData(300, 500),
    }));
    setData(initialData);

    // Update data periodically
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData];
        newData.forEach(item => {
          item.users += generateRandomData(-10, 20);
          item.engagement += generateRandomData(-5, 10);
          item.messages += generateRandomData(-20, 40);
        });
        return [...newData];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black/40 border border-[#9b87f5]/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-300">User Engagement</h4>
                <TrendingUp className="h-4 w-4 text-[#9b87f5]" />
              </div>
              <div className="h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3C" />
                    <XAxis dataKey="name" stroke="#4A4F5C" />
                    <YAxis stroke="#4A4F5C" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1A1F2C',
                        border: '1px solid rgba(155, 135, 245, 0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#9b87f5" 
                      fill="url(#colorEngagement)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="p-4 rounded-xl bg-black/40 border border-[#9b87f5]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-4 w-4 text-[#9b87f5]" />
                  <span className="text-xs text-gray-400">Active Users</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{data[6]?.users || 0}</h3>
                <span className="text-xs text-[#9b87f5]">+12.5% this week</span>
              </motion.div>

              <motion.div 
                className="p-4 rounded-xl bg-black/40 border border-[#9b87f5]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="h-4 w-4 text-[#9b87f5]" />
                  <span className="text-xs text-gray-400">Messages/Day</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{data[6]?.messages || 0}</h3>
                <span className="text-xs text-[#9b87f5]">+8.3% this week</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
