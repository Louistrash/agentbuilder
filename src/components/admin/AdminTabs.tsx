
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
    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-transparent">
      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="general"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#6366F1] transition-all duration-300 hover:text-[#6366F1] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-colors">
              <Settings className="h-6 w-6 text-[#6366F1]" />
            </div>
            <span className="font-medium">General</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="users"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#EC4899] transition-all duration-300 hover:text-[#EC4899] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
              <Users className="h-6 w-6 text-[#EC4899]" />
            </div>
            <span className="font-medium">Users</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="chat"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#3B82F6] transition-all duration-300 hover:text-[#3B82F6] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <MessageSquare className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <span className="font-medium">Chat</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="analytics"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#10B981] transition-all duration-300 hover:text-[#10B981] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <BarChart3 className="h-6 w-6 text-[#10B981]" />
            </div>
            <span className="font-medium">Analytics</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="tokens"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#F59E0B] transition-all duration-300 hover:text-[#F59E0B] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
              <Coins className="h-6 w-6 text-[#F59E0B]" />
            </div>
            <span className="font-medium">Tokens</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="appointments"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#6366F1] transition-all duration-300 hover:text-[#6366F1] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center group-hover:bg-[#6366F1]/20 transition-colors">
              <CalendarDays className="h-6 w-6 text-[#6366F1]" />
            </div>
            <span className="font-medium">Appointments</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="marketplace"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#EC4899] transition-all duration-300 hover:text-[#EC4899] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 flex items-center justify-center group-hover:bg-[#EC4899]/20 transition-colors">
              <Boxes className="h-6 w-6 text-[#EC4899]" />
            </div>
            <span className="font-medium">Marketplace</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="integrations"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#10B981] transition-all duration-300 hover:text-[#10B981] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <Rocket className="h-6 w-6 text-[#10B981]" />
            </div>
            <span className="font-medium">Integrations</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="subscriptions"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#F59E0B] transition-all duration-300 hover:text-[#F59E0B] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
              <CreditCard className="h-6 w-6 text-[#F59E0B]" />
            </div>
            <span className="font-medium">Subscriptions</span>
          </div>
        </TabsTrigger>
      </Card>

      <Card className="border-[#30363D] p-0 overflow-hidden bg-[#0D1117] hover:bg-[#161B22] transition-colors group">
        <TabsTrigger 
          value="training"
          className="w-full h-full data-[state=active]:bg-[#161B22] data-[state=active]:text-white data-[state=active]:border-[#3B82F6] transition-all duration-300 hover:text-[#3B82F6] gap-2 p-4 border-2 border-transparent"
        >
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <BookOpen className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <span className="font-medium">Training</span>
          </div>
        </TabsTrigger>
      </Card>
    </TabsList>
  );
}
