
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Plus } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useAdmin } from "@/hooks/useAdmin";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { messages, isTyping, sendMessage, initializeChat, endSession } = useChat();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    fetchLogo();
    setTimeout(() => setShowWelcome(true), 100);
  }, []);

  const fetchLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('logo_url')
        .single();
      if (error) throw error;
      setLogoUrl(data?.logo_url);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl || "/placeholder.svg"}
                alt="Chat Agent Builder Logo"
                className="w-10 h-10 rounded-lg"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Chat Agent Builder</h1>
                <p className="text-sm text-gray-400">Build. Deploy. Engage.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 animate-fade-up">
              Create Intelligent Chat Agents
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-up">
              Build, customize, and deploy AI chat agents for your business. Enhance customer engagement with intelligent conversations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/agents')}
              className="animate-fade-up bg-white text-gray-900 hover:bg-gray-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Agent
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-up">
              <h3 className="text-xl font-semibold mb-3">Easy to Build</h3>
              <p className="text-gray-400">
                Create custom chat agents with our intuitive builder interface. No coding required.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-up">
              <h3 className="text-xl font-semibold mb-3">Smart Responses</h3>
              <p className="text-gray-400">
                Leverage advanced AI to provide intelligent and contextual responses to user queries.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-up">
              <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
              <p className="text-gray-400">
                Track performance and gather insights to continuously improve your chat agents.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
