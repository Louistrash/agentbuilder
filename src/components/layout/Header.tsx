
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight, Menu, LogOut, User, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useState } from "react";
import { TokenDisplay } from "./TokenDisplay";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  logoUrl: string | null;
}

export function Header({
  logoUrl
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, userRole } = useAdmin();
  const { user, isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  // Check if we're on the blue page (Pro builder)
  const isProBuilderPage = location.pathname === "/agent-builder/pro";

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  // Function to get the user role display text
  const getUserRoleDisplay = () => {
    if (!isAuthenticated) return "Guest";
    
    if (userRole === "admin") return "Admin";
    if (userRole === "moderator") return "Moderator";
    
    // For custom super admin role
    const email = user?.email || "";
    if (email.includes("ceo") || email.includes("founder")) {
      return "CEO";
    }
    
    return "User";
  };

  const roleDisplay = getUserRoleDisplay();
  const hasAdminAccess = isAdmin || roleDisplay === "CEO";

  const handleLogin = () => {
    // Navigate to auth page and prevent multiple triggers
    try {
      window.location.href = '/auth'; // Use direct location change instead of navigate
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Error",
        description: "Failed to navigate to login page",
        variant: "destructive",
      });
    }
  };

  return (
    <header className={`${isProBuilderPage ? 'bg-transparent' : 'bg-black/20 backdrop-blur-md border-b border-white/10'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">
          {!isProBuilderPage && (
            <div className="flex items-center gap-3">
              <div 
                onClick={() => navigate('/')}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1A1F2C] flex items-center justify-center overflow-hidden cursor-pointer"
              >
                {logoUrl && !imageError ? (
                  <img 
                    src={logoUrl} 
                    alt="Chat Agent Builder Logo" 
                    className="w-full h-full object-contain p-1" 
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-[#1EAEDB] font-bold text-lg">L</div>
                )}
              </div>
              <div 
                onClick={() => navigate('/')}
                className="flex flex-col cursor-pointer"
              >
                <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Chat Agent Builder
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                  Build. Deploy. Engage.
                </p>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className={`${isProBuilderPage ? 'ml-auto' : ''} hidden sm:flex items-center gap-4`}>
            {isAuthenticated && <TokenDisplay />}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    {roleDisplay}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#1a1f35] border-white/10 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  
                  {hasAdminAccess && (
                    <DropdownMenuItem 
                      className="hover:bg-white/10 cursor-pointer text-gray-300 hover:text-white focus:bg-white/10 focus:text-white"
                      onClick={() => navigate('/admin')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem 
                    className="hover:bg-white/10 cursor-pointer text-gray-300 hover:text-white focus:bg-white/10 focus:text-white"
                    onClick={() => navigate('/agents')}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-white/10" />
                  
                  <DropdownMenuItem 
                    className="hover:bg-white/10 cursor-pointer text-gray-300 hover:text-white focus:bg-white/10 focus:text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogin}
                className="bg-[#1A1F2C] hover:bg-[#2A2F3C] border-none text-white hover:text-white rounded-full px-6 py-2 flex items-center gap-2 shadow-sm transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login / Sign Up
              </Button>
            )}
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
              {isAuthenticated && (
                <div className="px-4 py-2">
                  <TokenDisplay />
                </div>
              )}
              
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-white border-b border-white/10">
                    Signed in as {roleDisplay}
                  </div>
                  
                  {hasAdminAccess && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setShowMobileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      navigate('/agents');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center"
                  >
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    window.location.href = '/auth'; // Use direct location change for mobile menu too
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 hover:text-white flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login / Sign Up
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
