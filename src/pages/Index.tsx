
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Rocket, ChartBar, Play } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ProFeatures } from "@/components/home/ProFeatures";
import { FeatureOnboarding } from "@/components/agent-builder/FeatureOnboarding";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    navigate(`/agent-builder/${type}`);
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
      icon: <Rocket className="h-6 w-6 text-[#1EAEDB] filter drop-shadow-[0_0_8px_rgba(30,174,219,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      demoContent: 'Experience real-time AI responses powered by cutting-edge language models.',
      icon: <Rocket className="h-6 w-6 text-[#1EAEDB] filter drop-shadow-[0_0_8px_rgba(30,174,219,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent',
      bgColor: 'bg-black/20'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      demoContent: 'View sample analytics and see how you can optimize your chat agents.',
      icon: <ChartBar className="h-6 w-6 text-[#1EAEDB] filter drop-shadow-[0_0_8px_rgba(30,174,219,0.5)]" />,
      gradientClasses: 'bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent',
      bgColor: 'bg-black/20'
    }
  ];

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
                <Rocket className="h-5 w-5 mr-2" />
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
    </div>
  );
};

export default Index;
