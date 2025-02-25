
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminTabs() {
  return (
    <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-[#222939]/95 backdrop-blur-sm border-b border-[#1EAEDB]/10">
      <TabsTrigger 
        value="general"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90"
      >
        General
      </TabsTrigger>
      <TabsTrigger 
        value="chat"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90"
      >
        Chat
      </TabsTrigger>
      <TabsTrigger 
        value="users"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90"
      >
        Users
      </TabsTrigger>
      <TabsTrigger 
        value="tokens"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90"
      >
        Tokens
      </TabsTrigger>
      <TabsTrigger 
        value="analytics"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white transition-all duration-300 hover:text-[#1EAEDB]/90"
      >
        Analytics
      </TabsTrigger>
    </TabsList>
  );
}
