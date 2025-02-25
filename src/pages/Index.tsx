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
      icon: <Rocket className="h-16 w-16 text-blue-400" />,
      gradientClasses: 'bg-gradient-to-b from-[#1a237e]/20 to-[#1a1f35]',
      bgColor: 'bg-[#1a1f35]'
    },
    {
      id: 'smart',
      title: 'Smart Responses',
      description: 'Leverage advanced AI to provide intelligent and contextual responses to user queries.',
      demoContent: 'Experience real-time AI responses powered by cutting-edge language models.',
      icon: <Rocket className="h-16 w-16 text-teal-400" />,
      gradientClasses: 'bg-gradient-to-b from-[#004d40]/20 to-[#1a2b29]',
      bgColor: 'bg-[#1a2b29]'
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track performance and gather insights to continuously improve your chat agents.',
      demoContent: 'View sample analytics and see how you can optimize your chat agents.',
      icon: <ChartBar className="h-16 w-16 text-orange-400" />,
      gradientClasses: 'bg-gradient-to-b from-[#bf360c]/20 to-[#2b1f1a]',
      bgColor: 'bg-[#2b1f1a]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1116] text-white overflow-x-hidden">
      <Header logoUrl={logoUrl} />

      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Create Intelligent Chat Agents
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              Build, customize, and deploy AI chat agents for your business. Enhance customer engagement with intelligent conversations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/agents')}
                className="w-full sm:w-auto bg-white text-[#0f1116] hover:bg-gray-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Agent
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowOnboarding(true)}
                className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto">
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
