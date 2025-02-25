
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
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="general"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#6366F1] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-colors">
              <Settings className="h-5 w-5 text-[#6366F1]" />
            </div>
            <span>General</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="users"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#EC4899] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
              <Users className="h-5 w-5 text-[#EC4899]" />
            </div>
            <span>Users</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="chat"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#3B82F6] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <MessageSquare className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <span>Chat</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="analytics"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#10B981] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <BarChart3 className="h-5 w-5 text-[#10B981]" />
            </div>
            <span>Analytics</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="tokens"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#F59E0B] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
              <Coins className="h-5 w-5 text-[#F59E0B]" />
            </div>
            <span>Tokens</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="appointments"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#6366F1] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-colors">
              <CalendarDays className="h-5 w-5 text-[#6366F1]" />
            </div>
            <span>Appointments</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="marketplace"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#EC4899] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#EC4899]/10 flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
              <Boxes className="h-5 w-5 text-[#EC4899]" />
            </div>
            <span>Marketplace</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="integrations"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#10B981] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <Rocket className="h-5 w-5 text-[#10B981]" />
            </div>
            <span>Integrations</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="subscriptions"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#F59E0B] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
              <CreditCard className="h-5 w-5 text-[#F59E0B]" />
            </div>
            <span>Subscriptions</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="training"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white transition-all duration-300 hover:text-[#3B82F6] gap-2 p-4"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <BookOpen className="h-5 w-5 text-[#3B82F6]" />
            </div>
            <span>Training</span>
          </div>
        </TabsTrigger>
      </Card>
    </TabsList>
  );
}
