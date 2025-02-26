
import React, { useState, useEffect } from 'react';
import { Lock, BarChart3, MessageCircle, Code, Wifi, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const generateRandomData = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function ProFeatures() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const initialData = Array.from({length: 7}, (_, i) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      users: generateRandomData(100, 200),
      engagement: generateRandomData(60, 90),
      messages: generateRandomData(300, 500)
    }));
    setData(initialData);

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

  const proFeatures = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Advanced Chat Features",
      description: "Multi-turn conversations, context awareness, and customizable personalities",
      color: "rgb(236, 72, 153)" // Pink
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Detailed Analytics",
      description: "Track user engagement, conversation metrics, and performance insights",
      color: "rgb(99, 102, 241)" // Indigo
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing systems via our REST API",
      color: "rgb(16, 185, 129)" // Emerald
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Multi-Channel Support",
      description: "Deploy across web, mobile, and messaging platforms",
      color: "rgb(245, 158, 11)" // Amber
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 overflow-hidden"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-1 bg-emerald-500/10 rounded-full text-sm font-medium text-emerald-400 mb-4">
          <Lock className="h-4 w-4 mr-2" />
          Pro Features
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-emerald-400 bg-clip-text text-transparent">
          Unlock Advanced Capabilities
        </h3>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Take your agents to the next level with our professional features
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {proFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-black/20 border border-gray-800 hover:border-gray-700 transition-colors backdrop-blur-sm"
                style={{
                  background: `radial-gradient(circle at 100% 100%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)`,
                }}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center mb-3"
                     style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-300">User Engagement</h4>
              <TrendingUp className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(99, 102, 241)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="rgb(99, 102, 241)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="name" stroke="#555555" />
                  <YAxis stroke="#555555" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#222222',
                      border: '1px solid rgba(99, 102, 241, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="rgb(99, 102, 241)"
                    fill="url(#colorEngagement)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="p-4 rounded-xl bg-black/40 border border-pink-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="h-4 w-4 text-pink-400" />
                <span className="text-xs text-gray-400">Active Users</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">{data[6]?.users || 0}</h3>
              <span className="text-xs text-pink-400">+12.5% this week</span>
            </motion.div>

            <motion.div
              className="p-4 rounded-xl bg-black/40 border border-emerald-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-gray-400">Messages/Day</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">{data[6]?.messages || 0}</h3>
              <span className="text-xs text-emerald-400">+8.3% this week</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
