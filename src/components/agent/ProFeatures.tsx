
import React from 'react';
import { Check, Lock, MessageSquare, BarChart3, Code, Wifi, ArrowUpRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProFeatures() {
  return (
    <div className="bg-gradient-to-r from-[#131620] to-[#1C1C28] rounded-xl border border-[#30363D] overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0D6E57]/20 px-3 py-1.5 rounded-full">
            <Lock className="w-4 h-4 text-[#0DF5A3]" />
            <span className="text-xs font-medium text-[#0DF5A3]">Pro Features</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#EC4899]">Unlock Advanced Capabilities</h2>
          
          <p className="text-gray-400 max-w-2xl">
            Take your agents to the next level with our professional features
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 - Advanced Chat */}
          <Card className="bg-[#16171F] border-[#30363D] hover:border-[#EC4899]/50 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#EC4899]/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#EC4899]" />
              </div>
              
              <h3 className="font-semibold text-white">Advanced Chat Features</h3>
              
              <p className="text-sm text-gray-400">
                Multi-turn conversations, context awareness, and customizable personalities
              </p>
            </CardContent>
          </Card>
          
          {/* Card 2 - Analytics */}
          <Card className="bg-[#16171F] border-[#30363D] hover:border-[#4880EC]/50 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#4880EC]/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-[#4880EC]" />
              </div>
              
              <h3 className="font-semibold text-white">Detailed Analytics</h3>
              
              <p className="text-sm text-gray-400">
                Track user engagement, conversation metrics, and performance insights
              </p>
            </CardContent>
          </Card>
          
          {/* Card 3 - API */}
          <Card className="bg-[#16171F] border-[#30363D] hover:border-[#0DF5A3]/50 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#0DF5A3]/10 flex items-center justify-center">
                <Code className="w-4 h-4 text-[#0DF5A3]" />
              </div>
              
              <h3 className="font-semibold text-white">API Integration</h3>
              
              <p className="text-sm text-gray-400">
                Seamlessly integrate with your existing systems via our REST API
              </p>
            </CardContent>
          </Card>
          
          {/* Card 4 - Multi-Channel */}
          <Card className="bg-[#16171F] border-[#30363D] hover:border-[#F5B60D]/50 transition-colors">
            <CardContent className="p-5 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#F5B60D]/10 flex items-center justify-center">
                <Wifi className="w-4 h-4 text-[#F5B60D]" />
              </div>
              
              <h3 className="font-semibold text-white">Multi-Channel Support</h3>
              
              <p className="text-sm text-gray-400">
                Deploy across web, mobile, and messaging platforms
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Analytics Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Analytics Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-[#16171F] border-[#30363D] h-full">
              <CardContent className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">User Engagement</h3>
                  <ArrowUpRight className="w-4 h-4 text-[#4880EC]" />
                </div>
                
                <div className="w-full h-48 mt-2 relative">
                  {/* SVG Chart */}
                  <svg className="w-full h-full" viewBox="0 0 360 120">
                    {/* Grid Lines */}
                    <line x1="0" y1="0" x2="360" y2="0" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="0" y1="40" x2="360" y2="40" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="0" y1="80" x2="360" y2="80" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="0" y1="120" x2="360" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="50" y1="0" x2="50" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="100" y1="0" x2="100" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="150" y1="0" x2="150" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="200" y1="0" x2="200" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="250" y1="0" x2="250" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="300" y1="0" x2="300" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="350" y1="0" x2="350" y2="120" stroke="#30363D" strokeWidth="0.5" strokeDasharray="2,2" />
                    
                    {/* Chart Line */}
                    <path 
                      d="M0,100 C20,90 40,85 60,80 C90,70 120,60 150,50 C180,45 210,50 240,48 C270,45 300,40 330,20 C340,15 350,15 360,10" 
                      stroke="#4880EC" 
                      strokeWidth="2" 
                      fill="none" 
                    />
                    
                    {/* Area Under Chart */}
                    <path 
                      d="M0,100 C20,90 40,85 60,80 C90,70 120,60 150,50 C180,45 210,50 240,48 C270,45 300,40 330,20 C340,15 350,15 360,10 V120 H0 Z" 
                      fill="url(#gradient)" 
                      opacity="0.2" 
                    />
                    
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4880EC" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#4880EC" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* X-Axis Labels */}
                  <div className="flex justify-between text-xs text-gray-500 px-2 absolute bottom-0 left-0 right-0">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4">
            {/* Active Users */}
            <Card className="bg-[#16171F] border-[#30363D]">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#EC4899]" />
                    <span className="text-sm text-gray-400">Active Users</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-bold text-white">177</span>
                  <span className="text-xs text-[#EC4899]">+12.5% this week</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Messages Per Day */}
            <Card className="bg-[#16171F] border-[#30363D]">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#0DF5A3]" />
                    <span className="text-sm text-gray-400">Messages/Day</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-bold text-white">595</span>
                  <span className="text-xs text-[#0DF5A3]">+8.3% this week</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <Button className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-90 text-white font-medium py-6 px-8 text-base">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
