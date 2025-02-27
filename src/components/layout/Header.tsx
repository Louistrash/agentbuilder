
import { Button } from "@/components/ui/button";
import { Settings, LogIn, Menu } from "lucide-react";
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
  const { isAdmin } = useAdmin();
  const { user } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1F2C] flex items-center justify-center overflow-hidden">
              {logoUrl && !imageError ? (
                <img 
                  src={logoUrl} 
                  alt="Chat Agent Builder Logo" 
                  className="w-full h-full object-contain p-1" 
                  onError={() => setImageError(true)}
                />
              ) : (
                // Default SVG logo if no custom logo is available
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1EAEDB]">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#9B87F5" stroke="#9B87F5" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M8 10.5H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14.5H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-heading font-semibold text-gradient">
                Chat Agent Builder
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block tracking-wide">
                Build. Deploy. Engage.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            {user && <TokenDisplay />}
            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
                className="text-gray-300 hover:text-white hover:bg-white/10 font-medium"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(user ? '/agents' : '/auth')}
              className="text-gray-300 hover:text-white hover:bg-white/10 font-medium"
            >
              {user ? 'Dashboard' : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Login | Sign Up
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="absolute top-full right-0 w-48 mt-2 py-2 bg-[#1a1f35] rounded-lg shadow-xl border border-white/10 backdrop-blur-lg sm:hidden">
              {user && (
                <div className="px-4 py-2">
                  <TokenDisplay />
                </div>
              )}
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center font-medium"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </button>
              )}
              <button
                onClick={() => {
                  navigate(user ? '/agents' : '/auth');
                  setShowMobileMenu(false);
                }}
                className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center font-medium"
              >
                {user ? 'Dashboard' : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Login | Sign Up
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
