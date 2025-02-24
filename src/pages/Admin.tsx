
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { LogOut, Home } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        navigate('/');
      }
    };

    checkAdmin();
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-luxury-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-luxury-100 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-luxury-900">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Training</h2>
          <p className="text-gray-600 mb-6">
            Upload bestanden om de AI-assistent te trainen met nieuwe informatie.
            Alleen .txt en .pdf bestanden zijn toegestaan.
          </p>
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default Admin;
