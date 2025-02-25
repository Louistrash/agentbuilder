import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Rocket, ChartBar, Play } from "lucide-react";
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
      demoContent: 'Try our drag-and-drop interface and see how easy it is to create your first AI agent.',
      icon: <Rocket className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-blue-400" />,
      gradientClasses: 'bg-gradient-to-br from-[#1a237e]/10 to-[#283593]/5',
      bgColor: 'bg-[#1a1f35]'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      demoContent: 'Experience real-time AI responses powered by cutting-edge language models.',
      icon: <Rocket className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-teal-400" />,
      gradientClasses: 'bg-gradient-to-br from-[#004d40]/10 to-[#00695c]/5',
      bgColor: 'bg-[#1a2b29]'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      demoContent: 'View sample analytics and see how you can optimize your chat agents.',
      icon: <ChartBar className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-orange-400" />,
      gradientClasses: 'bg-gradient-to-br from-[#bf360c]/10 to-[#d84315]/5',
      bgColor: 'bg-[#2b1f1a]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1116] text-white overflow-x-hidden">
      <Header logoUrl={logoUrl} />

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 px-4">
              Create Intelligent Chat Agents
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Build, customize, and deploy AI chat agents for your business. Enhance customer engagement with intelligent conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <Button
                size="lg"
                onClick={() => navigate('/agents')}
                className="w-full sm:w-auto bg-white text-[#0f1116] hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-11"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Create Your First Agent
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowOnboarding(true)}
                className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800 text-sm sm:text-base h-10 sm:h-11"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0 max-w-4xl mx-auto">
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
