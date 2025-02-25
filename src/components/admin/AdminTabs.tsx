
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, MessageSquare, Settings, Users, Coins } from "lucide-react";

export function AdminTabs() {
  return (
    <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-[#222939]/95 backdrop-blur-sm border-b border-[#1EAEDB]/10">
      <TabsTrigger 
        value="general"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <Settings className="h-4 w-4" />
        General
      </TabsTrigger>
      <TabsTrigger 
        value="chat"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Chat
      </TabsTrigger>
      <TabsTrigger 
        value="users"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <Users className="h-4 w-4" />
        Users
      </TabsTrigger>
      <TabsTrigger 
        value="tokens"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <Coins className="h-4 w-4" />
        Tokens
      </TabsTrigger>
      <TabsTrigger 
        value="analytics"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </TabsTrigger>
    </TabsList>
  );
}
