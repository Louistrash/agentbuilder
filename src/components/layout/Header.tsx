
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";

interface HeaderProps {
  logoUrl: string | null;
}

export function Header({ logoUrl }: HeaderProps) {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl || "/placeholder.svg"}
              alt="Chat Agent Builder Logo"
              className="w-10 h-10 rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Chat Agent Builder</h1>
              <p className="text-sm text-gray-400">Build. Deploy. Engage.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/auth')}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
