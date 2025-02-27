
import React, { useState, useEffect } from 'react';
import { Lock, BarChart3, MessageCircle, Code, Wifi, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";

const generateRandomData = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function ProFeatures() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate initial chart data
    const initialData = Array.from({length: 7}, (_, i) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      users: generateRandomData(70, 140),
      engagement: generateRandomData(60, 90)
    }));
    setData(initialData);

    // Update data every 5 seconds to simulate real-time changes
    const interval = setInterval(() => {
      setData(currentData => {
        const newData = [...currentData];
        newData.forEach(item => {
          item.users += generateRandomData(-10, 10);
          item.engagement += generateRandomData(-5, 5);
        });
        return [...newData];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const proFeatures = [
    {
      icon: <MessageCircle className="h-5 w-5 text-pink-500" />,
      title: "Advanced Chat Features",
      description: "Multi-turn conversations, context awareness, and customizable personalities",
      color: "#9B87F5", // Purple
      bgColor: "rgba(155, 135, 245, 0.1)"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
      title: "Detailed Analytics",
      description: "Track user engagement, conversation metrics, and performance insights",
      color: "#3B82F6", // Blue
      bgColor: "rgba(59, 130, 246, 0.1)"
    },
    {
      icon: <Code className="h-5 w-5 text-emerald-500" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing systems via our REST API",
      color: "#10B981", // Emerald
      bgColor: "rgba(16, 185, 129, 0.1)"
    },
    {
      icon: <Wifi className="h-5 w-5 text-amber-500" />,
      title: "Multi-Channel Support",
      description: "Deploy across web, mobile, and messaging platforms",
      color: "#F59E0B", // Amber
      bgColor: "rgba(245, 158, 11, 0.1)"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-[#0F1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 sm:p-10">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center px-4 py-1 bg-[rgba(16,185,129,0.1)] rounded-full text-sm font-medium text-emerald-400">
              <Lock className="h-4 w-4 mr-2" />
              Pro Features
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Unlock Advanced Capabilities
          </h2>
          
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Take your agents to the next level with our professional features
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid sm:grid-cols-2 gap-6">
                {proFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden p-6 hover:border-gray-700 transition-all"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: feature.bgColor, color: feature.color }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-300">User Engagement</h4>
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" opacity={0.2} />
                      <XAxis dataKey="name" stroke="#555555" />
                      <YAxis stroke="#555555" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1F2C',
                          border: '1px solid rgba(59, 130, 246, 0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#3B82F6"
                        fill="url(#colorUsers)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-black/50 border border-gray-800 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-4 w-4 text-pink-500" />
                    <span className="text-xs text-gray-400">Active Users</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">177</h3>
                  <span className="text-xs text-pink-500">+12.5% this week</span>
                </motion.div>

                <motion.div
                  className="bg-black/50 border border-gray-800 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-400">Messages/Day</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">595</h3>
                  <span className="text-xs text-green-500">+8.3% this week</span>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
