
import { Settings, MessageSquare, Calendar, BarChart3, Link2, Globe } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminTabs = () => {
  return (
    <div className="border-b border-luxury-100">
      <TabsList className="p-0 h-auto bg-transparent border-b border-luxury-100">
        <TabsTrigger 
          value="general" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <Settings className="h-4 w-4" />
          General Settings
        </TabsTrigger>
        <TabsTrigger 
          value="chat" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <MessageSquare className="h-4 w-4" />
          Chat Behavior
        </TabsTrigger>
        <TabsTrigger 
          value="appointments" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <Calendar className="h-4 w-4" />
          Appointments
        </TabsTrigger>
        <TabsTrigger 
          value="analytics" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <BarChart3 className="h-4 w-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger 
          value="training" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <Globe className="h-4 w-4" />
          Training
        </TabsTrigger>
        <TabsTrigger 
          value="integrations" 
          className="flex items-center gap-2 px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-luxury-600"
        >
          <Link2 className="h-4 w-4" />
          Integrations
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
