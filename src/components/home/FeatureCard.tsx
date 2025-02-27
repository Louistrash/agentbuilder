
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export function FeatureCard({ title, description, icon: Icon, color }: FeatureCardProps) {
  return (
    <Card className="bg-[#1A1F2C] border-[#30363D] overflow-hidden transition-colors hover:border-opacity-80 hover:border-gray-600">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="p-3 rounded-lg mb-4 w-fit" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-5 w-5" style={{ color: color }} />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
