
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  MessagesSquare,
  Calendar,
  BarChart3,
  BookOpen,
  Link2,
  Users,
  CreditCard,
  Store,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AdminTabs = () => {
  return (
    <ScrollArea className="w-full">
      <TabsList className="flex p-2 overflow-x-auto space-x-2 sm:grid sm:grid-cols-3 md:grid-cols-9 md:gap-4">
        <TabsTrigger 
          value="general" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span className="inline">General</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="chat" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <MessagesSquare className="h-4 w-4" />
          <span className="inline">Chat</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="appointments" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <Calendar className="h-4 w-4" />
          <span className="inline">Appointments</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="analytics" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <BarChart3 className="h-4 w-4" />
          <span className="inline">Analytics</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="training" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          <span className="inline">Training</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="integrations" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <Link2 className="h-4 w-4" />
          <span className="inline">Integrations</span>
        </TabsTrigger>

        <TabsTrigger 
          value="users" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <Users className="h-4 w-4" />
          <span className="inline">Users</span>
        </TabsTrigger>

        <TabsTrigger 
          value="subscriptions" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <CreditCard className="h-4 w-4" />
          <span className="inline">Subscriptions</span>
        </TabsTrigger>

        <TabsTrigger 
          value="marketplace" 
          className="flex items-center justify-center gap-2 min-w-[120px] sm:min-w-0 px-4 py-2 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors"
        >
          <Store className="h-4 w-4" />
          <span className="inline">Marketplace</span>
        </TabsTrigger>
      </TabsList>
    </ScrollArea>
  );
};
