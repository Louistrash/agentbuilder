
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="p-6 border-b border-[#1EAEDB]/10 flex justify-between items-center bg-[#222939]">
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#1EAEDB] via-white to-[#1EAEDB]/70 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-white hover:bg-[#1EAEDB]/10"
        >
          <Home className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-white hover:bg-[#1EAEDB]/10"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
