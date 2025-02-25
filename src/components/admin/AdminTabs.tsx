
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  Coins, 
  CalendarDays,
  Boxes,
  Rocket,
  CreditCard,
  BookOpen
} from "lucide-react";

export function AdminTabs() {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-[#222939]/95 backdrop-blur-sm">
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
      <TabsTrigger 
        value="appointments"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <CalendarDays className="h-4 w-4" />
        Appointments
      </TabsTrigger>
      <TabsTrigger 
        value="marketplace"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <Boxes className="h-4 w-4" />
        Marketplace
      </TabsTrigger>
      <TabsTrigger 
        value="integrations"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <Rocket className="h-4 w-4" />
        Integrations
      </TabsTrigger>
      <TabsTrigger 
        value="subscriptions"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <CreditCard className="h-4 w-4" />
        Subscriptions
      </TabsTrigger>
      <TabsTrigger 
        value="training"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2"
      >
        <BookOpen className="h-4 w-4" />
        Training
      </TabsTrigger>
    </TabsList>
  );
}
