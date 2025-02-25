import { Button } from "@/components/ui/button";
import { Settings, ArrowRight, Menu, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useState } from "react";
import { TokenDisplay } from "./TokenDisplay";
import { useAuth } from "@/lib/auth";
interface HeaderProps {
  logoUrl: string | null;
}
export function Header({
  logoUrl
}: HeaderProps) {
  const navigate = useNavigate();
  const {
    isAdmin
  } = useAdmin();
  const {
    user
  } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  return <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1F2C] flex items-center justify-center overflow-hidden">
              {logoUrl && !imageError ? <img src={logoUrl} alt="Chat Agent Builder Logo" className="w-full h-full object-cover" onError={() => setImageError(true)} /> : <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-[#1EAEDB]" />}
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Chat Agent Builder
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                Build. Deploy. Engage.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            {user && <TokenDisplay />}
            {isAdmin && <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="text-gray-300 hover:text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>}
            <Button variant="ghost" size="sm" onClick={() => navigate(user ? '/agents' : '/auth')} className="text-gray-300 hover:text-white hover:bg-white/10">
              {user ? 'Dashboard' : 'Get Started'} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu className="h-5 w-5" />
          </button>

          {/* Mobile Menu */}
          {showMobileMenu && <div className="absolute top-full right-0 w-48 mt-2 py-2 bg-[#1a1f35] rounded-lg shadow-xl border border-white/10 backdrop-blur-lg sm:hidden">
              {user && <div className="px-4 py-2">
                  <TokenDisplay />
                </div>}
              {isAdmin && <button onClick={() => {
            navigate('/admin');
            setShowMobileMenu(false);
          }} className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </button>}
              <button onClick={() => {
            navigate(user ? '/agents' : '/auth');
            setShowMobileMenu(false);
          }} className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center">
                {user ? 'Dashboard' : 'Get Started'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>}
        </div>
      </div>
    </header>;
}