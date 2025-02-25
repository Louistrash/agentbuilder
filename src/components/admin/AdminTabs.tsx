import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminTabs() {
  return (
    <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-transparent">
      <TabsTrigger value="general">General</TabsTrigger>
      <TabsTrigger value="chat">Chat</TabsTrigger>
      <TabsTrigger value="users">Users</TabsTrigger>
      <TabsTrigger value="tokens">Tokens</TabsTrigger>
      <TabsTrigger value="analytics">Analytics</TabsTrigger>
    </TabsList>
  );
}
