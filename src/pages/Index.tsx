
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Brain, Zap, BarChart3 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ProFeatures } from "@/components/home/ProFeatures";
import { FeatureOnboarding } from "@/components/agent-builder/FeatureOnboarding";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useTokens } from "@/context/TokenContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { animateTokenChange } = useTokens();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showTokenAnimation, setShowTokenAnimation] = useState(false);

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

  const handleCreateAgentClick = (type: 'free' | 'pro') => {
    console.log(`Navigating to ${type} agent builder`);
    
    // If this is the free agent, trigger the token animation
    if (type === 'free' && user) {
      // Show token animation
      setShowTokenAnimation(true);
      
      // Animate tokens from 0 to 50
      animateTokenChange(50);
      
      // Display toast message
      toast({
        title: "Tokens Added!",
        description: "You've received 50 tokens to create your first agent.",
        variant: "default",
      });
      
      // Navigate after a brief delay to allow animation to be seen
      setTimeout(() => {
        navigate(`/agent-builder/${type}`);
      }, 1500);
    } else {
      // Navigate immediately for pro or when not logged in
      navigate(`/agent-builder/${type}`);
    }
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

  const features = [
    {
      id: 'build',
      title: 'Easy to Build',
      description: 'Create custom chat agents with our intuitive builder interface. No coding required.',
      demoContent: 'Try our drag-and-drop interface and see how easy it is to create your first AI agent.',
      icon: <Brain className="h-6 w-6 text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      demoContent: 'Experience real-time AI responses powered by cutting-edge language models.',
      icon: <Zap className="h-6 w-6 text-[#D946EF] filter drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#D946EF]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      demoContent: 'View sample analytics and see how you can optimize your chat agents.',
      icon: <BarChart3 className="h-6 w-6 text-[#0EA5E9] filter drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#0EA5E9]/5 to-transparent',
      bgColor: 'bg-black/20'
    }
  ];

  // Token animation overlay
  const TokenAnimationOverlay = () => {
    if (!showTokenAnimation) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-[#1A1F2C] p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-[#1EAEDB]/30">
          <div className="w-20 h-20 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center mb-4">
            <Zap className="h-10 w-10 text-[#1EAEDB] animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">50 Tokens Added!</h3>
          <p className="text-gray-400 text-center mb-6">
            You've received 50 tokens to create your first AI agent. Enjoy building!
          </p>
          <div className="w-full bg-[#30363D] h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#1EAEDB] to-[#8B5CF6] h-full rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-x-hidden">
      <Header logoUrl={logoUrl} />

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#1EAEDB] via-white to-[#1EAEDB]/70 bg-clip-text text-transparent">
              Create Intelligent Chat Agents
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Build, customize, and deploy AI chat agents for your business. Enhance customer engagement with intelligent conversations.
            </p>
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <Button
                size="default"
                onClick={() => handleCreateAgentClick('free')}
                className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white transition-all duration-300 h-12 rounded-xl font-medium text-base shadow-lg shadow-[#1EAEDB]/25 transform hover:scale-[1.02]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Agent (Free)
              </Button>
              <Button
                size="default"
                variant="outline"
                onClick={() => handleCreateAgentClick('pro')}
                className="w-full bg-transparent backdrop-blur-sm border-2 border-[#1EAEDB]/20 text-white hover:bg-[#1EAEDB]/10 hover:border-[#1EAEDB]/30 transition-all duration-300 h-12 rounded-xl font-medium text-base transform hover:scale-[1.02]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Access Pro Features
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature.id}
                title={feature.title}
                description={feature.description}
                demoContent={feature.demoContent}
                icon={feature.icon}
                onClick={() => handleFeatureClick(feature.id)}
                isHovered={hoveredCard === feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                isClicked={clickedCard === feature.id}
                gradientClasses={feature.gradientClasses}
                bgColor={feature.bgColor}
              />
            ))}
          </div>

          <ProFeatures />
        </div>
      </main>

      <FeatureOnboarding
        feature={selectedFeature}
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
      />

      {/* Token animation overlay */}
      <TokenAnimationOverlay />
    </div>
  );
};

export default Index;
