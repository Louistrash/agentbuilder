
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Rocket, ChartBar, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { FeatureCard } from "@/components/home/FeatureCard";
import { ProFeatures } from "@/components/home/ProFeatures";
import { FeatureOnboarding } from "@/components/agent-builder/FeatureOnboarding";

const Index = () => {
  const navigate = useNavigate();
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
      icon: <Rocket className="h-16 w-16 text-blue-400" />,
      gradientClasses: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
      customAnimation: (
        <>
          <Rocket 
            className={`h-16 w-16 text-blue-400 transition-all duration-500 transform
              ${hoveredCard === 'build' ? 'translate-y-[-8px] scale-110' : ''}`} 
          />
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300
            ${hoveredCard === 'build' ? 'opacity-100' : ''}`} />
        </>
      )
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      icon: <MessageSquare className="h-16 w-16 text-green-400" />,
      gradientClasses: 'bg-gradient-to-br from-green-500/20 to-teal-500/20',
      customAnimation: (
        <>
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500
            ${hoveredCard === 'smart' ? 'translate-y-0' : 'translate-y-full'}`}>
            <MessageSquare className="h-16 w-16 text-green-400 animate-bounce" />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500
            ${hoveredCard === 'smart' ? 'translate-y-[-100%]' : 'translate-y-0'}`}>
            <Rocket className="h-16 w-16 text-teal-400" />
          </div>
        </>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      icon: <ChartBar className="h-16 w-16 text-orange-400" />,
      gradientClasses: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      customAnimation: (
        <div className="flex flex-col items-center space-y-2 transition-transform duration-500">
          <ChartBar 
            className={`h-16 w-16 text-orange-400 transition-all duration-300
              ${hoveredCard === 'analytics' ? 'scale-110' : ''}`}
          />
          <div className={`flex space-x-2 transition-opacity duration-300
            ${hoveredCard === 'analytics' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-2 h-8 bg-orange-400/50 rounded-t animate-pulse" />
            <div className="w-2 h-12 bg-orange-400/70 rounded-t animate-pulse" />
            <div className="w-2 h-6 bg-orange-400/40 rounded-t animate-pulse" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header logoUrl={logoUrl} />

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
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                onClick={() => handleFeatureClick(feature.id)}
                isHovered={hoveredCard === feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                isClicked={clickedCard === feature.id}
                gradientClasses={feature.gradientClasses}
                customAnimation={feature.customAnimation}
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
