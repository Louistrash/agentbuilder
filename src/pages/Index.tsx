import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useAdmin } from "@/hooks/useAdmin";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { messages, isTyping, sendMessage, initializeChat, endSession } = useChat();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const setupChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await initializeChat(user?.id);
    };

    setupChat();
    fetchLogo();
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
    await endSession();
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      products: "Vertel me over uw luxe matrassen en de materialen die u gebruikt.",
      book: "Ik wil graag een showroom bezoek inplannen. Wat zijn de beschikbare tijden?",
      sleep: "Kunt u mij expert slaaptips geven?",
      contact: "Wat zijn uw contactgegevens en de locatie van de showroom?",
    };

    sendMessage(actionMessages[action]);
  };

  return (
    <div className="min-h-screen bg-luxury-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-luxury-100 p-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl || "/placeholder.svg"} 
              alt="Archibot AI Logo" 
              className="w-[70px] h-[70px] object-contain"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-lg font-semibold text-luxury-900">Archibot AI</h1>
              <p className="text-sm text-luxury-600">Luxury Sleep Coach</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin')}
                className="text-luxury-600 hover:text-luxury-800"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 md:p-4">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          onSend={sendMessage}
          onQuickAction={handleQuickAction}
        />
      </div>
    </div>
  );
};

export default Index;
