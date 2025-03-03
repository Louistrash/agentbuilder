import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AdminHeader() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const defaultLogoUrl = "/logo.png";

  useEffect(() => {
    fetchLogo();
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

  return (
    <div className="bg-[#0D1117] border-b border-[#30363D] py-3">
      <div className="container mx-auto px-4">
        <Link to="/" className="flex items-center w-fit">
          <img 
            src={logoUrl || defaultLogoUrl} 
            alt="Platform Logo" 
            className="h-8 w-auto mr-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultLogoUrl;
              // If default logo also fails, use text-only fallback
              target.onerror = () => {
                target.style.display = 'none';
              };
            }}
          />
          <span className="text-2xl font-bold text-[#1EAEDB]">AI Agent</span>
        </Link>
      </div>
    </div>
  );
}