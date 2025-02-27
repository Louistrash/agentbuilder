
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  MessageSquare, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  const [userStats, setUserStats] = useState({
    totalAgents: 2,
    activeChats: 5,
    uptime: "99.8%",
    tokenBalance: 50
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Here you would fetch user stats from your API
    // For now we'll just simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          <p className="text-gray-400">Monitor and manage your AI agents</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#161B22] border-[#30363D] hover:border-[#1EAEDB]/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <User className="w-4 h-4 mr-2 text-[#1EAEDB]" />
                Total Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.totalAgents}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#161B22] border-[#30363D] hover:border-[#1EAEDB]/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#1EAEDB]" />
                Active Chats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.activeChats}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#161B22] border-[#30363D] hover:border-[#1EAEDB]/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#1EAEDB]" />
                Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.uptime}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#161B22] border-[#30363D] hover:border-[#1EAEDB]/30 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-[#1EAEDB]" />
                Token Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userStats.tokenBalance}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#161B22] border-[#30363D] md:col-span-2 hover:border-[#1EAEDB]/30 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#1A1F2C] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">Customer Support Bot Updated</h3>
                      <p className="text-sm text-gray-400 mt-1">You've updated the prompt for your customer support agent</p>
                    </div>
                    <Badge className="bg-[#1EAEDB]/20 text-[#1EAEDB] hover:bg-[#1EAEDB]/30">Update</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                </div>
                
                <div className="bg-[#1A1F2C] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">New Agent Created</h3>
                      <p className="text-sm text-gray-400 mt-1">You've created a new marketing assistant agent</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">New</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Yesterday</p>
                </div>
                
                <div className="bg-[#1A1F2C] rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">Tokens Added</h3>
                      <p className="text-sm text-gray-400 mt-1">You've received 50 tokens as a welcome bonus</p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Tokens</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#161B22] border-[#30363D] hover:border-[#1EAEDB]/30 transition-colors h-fit">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full flex items-center justify-between bg-[#1A1F2C] hover:bg-[#222939] text-white border border-[#30363D]"
                variant="outline"
                onClick={() => navigate('/agent-builder/free')}
              >
                <span>Create New Agent</span>
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
              
              <Button 
                className="w-full flex items-center justify-between bg-[#1A1F2C] hover:bg-[#222939] text-white border border-[#30363D]"
                variant="outline"
                onClick={() => navigate('/agent-manager')}
              >
                <span>Manage Agents</span>
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
              
              <Link 
                to="/settings"
                className="block w-full"
              >
                <Button 
                  className="w-full flex items-center justify-between bg-[#1A1F2C] hover:bg-[#222939] text-white border border-[#30363D]"
                  variant="outline"
                >
                  <span>Account Settings</span>
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              
              <div className="bg-gradient-to-r from-[#3B82F6]/10 to-[#1EAEDB]/10 rounded-lg p-4 border border-[#30363D] mt-4">
                <h3 className="font-medium text-white flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#1EAEDB]" />
                  Upgrade to Pro
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Get unlimited agents, advanced features and priority support.
                </p>
                <Button className="w-full mt-4 bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white">
                  View Pro Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
