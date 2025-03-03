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
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching logo:', error);
      }
      
      if (data?.logo_url) {
        setLogoUrl(data.logo_url);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const handleCreateAgentClick = () => {
    if (user) {
      setShowTokenAnimation(true);
      animateTokenChange(60);
      
      toast({
        title: "Tokens Added!",
        description: "You've received 60 tokens to create agents and add features.",
        variant: "default",
      });
      
      setTimeout(() => {
        navigate('/agent-builder/free');
      }, 1500);
    } else {
      navigate('/auth');
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
      title: 'Create Two Agents',
      description: 'Build two custom chat agents with your 60 tokens (30 tokens each) or one agent with extra features.',
      demoContent: 'Use our easy interface to create your AI agents - no coding needed!',
      icon: <Brain className="h-6 w-6 text-[#8B5CF6] filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Add analytics (15 tokens) or custom training (20 tokens) to enhance your agent.',
      demoContent: 'Customize your agent with additional features using your token balance.',
      icon: <Zap className="h-6 w-6 text-[#D946EF] filter drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#D946EF]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'analytics',
      title: 'Basic Analytics',
      description: 'Track basic performance metrics for 15 tokens to understand how your chat agents are performing.',
      demoContent: 'View essential analytics to optimize your chat agents.',
      icon: <BarChart3 className="h-6 w-6 text-[#0EA5E9] filter drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#0EA5E9]/5 to-transparent',
      bgColor: 'bg-black/20'
    }
  ];

  const TokenAnimationOverlay = () => {
    if (!showTokenAnimation) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-[#1A1F2C] p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm mx-4 border border-[#1EAEDB]/30">
          <div className="w-20 h-20 rounded-full bg-[#1EAEDB]/10 flex items-center justify-center mb-4">
            <Zap className="h-10 w-10 text-[#1EAEDB] animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">60 Tokens Added!</h3>
          <p className="text-gray-400 text-center mb-6">
            You've received 60 tokens to create agents and add features. Create two agents or one agent with extra features!
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
              Create Your Free AI Chat Agents
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Get started with 60 free tokens - enough for two agents or one agent with extra features!
            </p>
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <Button
                size="default"
                onClick={handleCreateAgentClick}
                className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white transition-all duration-300 h-12 rounded-xl font-medium text-base shadow-lg shadow-[#1EAEDB]/25 transform hover:scale-[1.02]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Agent (Free)
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

      <TokenAnimationOverlay />
    </div>
  );
};

export default Index;