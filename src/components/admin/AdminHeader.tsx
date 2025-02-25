
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function AdminHeader() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('logo_url')
        .single();

      if (!error && data) {
        setLogoUrl(data.logo_url);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="bg-[#1A1F2C]/50 border-b border-[#1EAEDB]/10 py-6 px-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#1A1F2C] flex items-center justify-center overflow-hidden border border-[#1EAEDB]/10">
          {logoUrl && !imageError ? (
            <img
              src={logoUrl}
              alt="Platform Logo"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Rocket className="w-6 h-6 text-[#1EAEDB]" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Manage your platform settings and configurations
          </p>
        </div>
      </div>
    </div>
  );
}
