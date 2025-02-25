
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
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
      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="general"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <Settings className="h-4 w-4" />
          General
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden bg-[#1EAEDB]/5">
        <TabsTrigger 
          value="users"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden bg-[#1EAEDB]/5">
        <TabsTrigger 
          value="chat"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <MessageSquare className="h-4 w-4" />
          Chat
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden bg-[#1EAEDB]/5">
        <TabsTrigger 
          value="analytics"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden bg-[#1EAEDB]/5">
        <TabsTrigger 
          value="tokens"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <Coins className="h-4 w-4" />
          Tokens
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="appointments"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <CalendarDays className="h-4 w-4" />
          Appointments
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="marketplace"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <Boxes className="h-4 w-4" />
          Marketplace
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="integrations"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <Rocket className="h-4 w-4" />
          Integrations
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="subscriptions"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <CreditCard className="h-4 w-4" />
          Subscriptions
        </TabsTrigger>
      </Card>

      <Card className="border-none p-0 overflow-hidden">
        <TabsTrigger 
          value="training"
          className="w-full h-full data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90 gap-2 p-4"
        >
          <BookOpen className="h-4 w-4" />
          Training
        </TabsTrigger>
      </Card>
    </TabsList>
  );
}
