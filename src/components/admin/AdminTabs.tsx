
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminTabs() {
  return (
    <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-[#222939] border-b border-[#1EAEDB]/10">
      <TabsTrigger 
        value="general"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white"
      >
        General
      </TabsTrigger>
      <TabsTrigger 
        value="chat"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white"
      >
        Chat
      </TabsTrigger>
      <TabsTrigger 
        value="users"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white"
      >
        Users
      </TabsTrigger>
      <TabsTrigger 
        value="tokens"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white"
      >
        Tokens
      </TabsTrigger>
      <TabsTrigger 
        value="analytics"
        className="data-[state=active]:bg-[#1EAEDB] data-[state=active]:text-white"
      >
        Analytics
      </TabsTrigger>
    </TabsList>
  );
}
