
import { UserPlus, ShoppingBag, Share2, Calendar, MessageSquare, Heart, Languages, Paintbrush, Type, Users } from "lucide-react";
import React from "react";

// Icon mapping
export const iconMap: Record<string, React.ReactNode> = {
  'UserPlus': <UserPlus className="h-6 w-6" />,
  'ShoppingBag': <ShoppingBag className="h-6 w-6" />,
  'Share2': <Share2 className="h-6 w-6" />,
  'Calendar': <Calendar className="h-6 w-6" />,
  'MessageSquare': <MessageSquare className="h-6 w-6" />,
  'Heart': <Heart className="h-6 w-6" />,
  'Languages': <Languages className="h-6 w-6" />,
  'Paintbrush': <Paintbrush className="h-6 w-6" />,
  'Type': <Type className="h-6 w-6" />,
  'Users': <Users className="h-6 w-6" />,
};

// Color mapping for categories
export const categoryColors: Record<string, string> = {
  'automation': 'bg-blue-500/10 text-blue-500',
  'communication': 'bg-green-500/10 text-green-500',
  'customization': 'bg-purple-500/10 text-purple-500',
  'analytics': 'bg-orange-500/10 text-orange-500',
  'integration': 'bg-pink-500/10 text-pink-500',
};

// Text color mapping for buttons
export const categoryTextColors: Record<string, string> = {
  'automation': 'text-blue-400',
  'communication': 'text-green-400',
  'customization': 'text-purple-400',
  'analytics': 'text-orange-400',
  'integration': 'text-pink-400',
};
