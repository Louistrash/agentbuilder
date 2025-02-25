import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Plus, Code, Rocket, ChartBar } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useAdmin } from "@/hooks/useAdmin";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FeatureOnboarding } from "@/components/agent-builder/FeatureOnboarding";
import { WidgetCode } from "@/components/agent-builder/WidgetCode";

const Index = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');

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

  const handleFeatureClick = (feature: string) => {
    setClickedCard(feature);
    setSelectedFeature(feature);
    setShowOnboarding(true);
  };

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    navigate('/agents', { state: { feature: selectedFeature } });
  };

  const getCardClassName = (feature: string) => {
    const baseClasses = "p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all cursor-pointer transform";
    const clickedClasses = clickedCard === feature ? "scale-95 opacity-75" : "hover:scale-105";
    return `${baseClasses} ${clickedClasses}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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
                onClick={() => navigate('/auth')}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
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

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card 
              className={getCardClassName('build')}
              onClick={() => handleFeatureClick('build')}
            >
              <div className="mb-6 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Rocket className={`h-16 w-16 text-blue-400 transition-transform duration-300 ${clickedCard === 'build' ? 'scale-90' : 'hover:scale-110'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy to Build</h3>
              <p className="text-gray-400">
                Create custom chat agents with our intuitive builder interface. No coding required.
              </p>
            </Card>

            <Card 
              className={getCardClassName('smart')}
              onClick={() => handleFeatureClick('smart')}
            >
              <div className="mb-6 h-40 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="Smart Response"
                  className={`h-full w-full object-cover rounded-lg opacity-75 transition-transform duration-300 ${clickedCard === 'smart' ? 'scale-110' : 'hover:scale-105'}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Responses</h3>
              <p className="text-gray-400">
                Leverage advanced AI to provide intelligent and contextual responses to user queries.
              </p>
            </Card>

            <Card 
              className={getCardClassName('analytics')}
              onClick={() => handleFeatureClick('analytics')}
            >
              <div className="mb-6 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <ChartBar className={`h-16 w-16 text-orange-400 transition-transform duration-300 ${clickedCard === 'analytics' ? 'scale-90' : 'hover:scale-110'}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
              <p className="text-gray-400">
                Track performance and gather insights to continuously improve your chat agents.
              </p>
            </Card>
          </div>

          <div className="mt-24 text-center">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
              Pro Features
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Advanced Integration Options
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Take your chat agents to the next level with our professional integration options.
            </p>
            <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="text-left">
                  <h4 className="text-xl font-semibold mb-4">
                    Embed Anywhere
                  </h4>
                  <p className="text-gray-400 mb-6">
                    Integrate your chat agents seamlessly into any website or application with our
                    widget or shortcode options.
                  </p>
                  <Button 
                    onClick={() => navigate('/agents?pro=true')}
                    className="bg-white text-gray-900 hover:bg-gray-200"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Create Agent to Get Code
                  </Button>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                  <WidgetCode agentId="demo-agent" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <FeatureOnboarding
        feature={selectedFeature}
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />
    </div>
  );
};

export default Index;
