
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  MessagesSquare,
  Calendar,
  BarChart3,
  BookOpen,
  Link2,
  Users,
} from "lucide-react";

export const AdminTabs = () => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-7 gap-4 px-4 py-2">
        <TabsTrigger value="general" className="gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">General</span>
        </TabsTrigger>
        
        <TabsTrigger value="chat" className="gap-2">
          <MessagesSquare className="h-4 w-4" />
          <span className="hidden md:inline">Chat</span>
        </TabsTrigger>
        
        <TabsTrigger value="appointments" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden md:inline">Appointments</span>
        </TabsTrigger>
        
        <TabsTrigger value="analytics" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden md:inline">Analytics</span>
        </TabsTrigger>
        
        <TabsTrigger value="training" className="gap-2">
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Training</span>
        </TabsTrigger>
        
        <TabsTrigger value="integrations" className="gap-2">
          <Link2 className="h-4 w-4" />
          <span className="hidden md:inline">Integrations</span>
        </TabsTrigger>

        <TabsTrigger value="users" className="gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Users</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
