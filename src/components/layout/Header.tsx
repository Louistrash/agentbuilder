import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { TokenDisplay } from "./TokenDisplay";
import { UserMenu } from "./UserMenu";
import { useAdmin } from "@/hooks/useAdmin";
import { LogIn } from "lucide-react";

interface HeaderProps {
  logoUrl?: string | null;
}

export const Header = ({
  logoUrl
}: HeaderProps) => {
  const { user } = useAuth();
  const { isSuperAdmin, isProAdmin, isAdmin } = useAdmin();
  
  // Default logo URL as fallback
  const defaultLogoUrl = "/logo.png";
  
  const getDashboardLink = () => {
    if (isSuperAdmin) return "/super-admin";
    if (isProAdmin) return "/pro-admin";
    if (isAdmin) return "/admin";
    return "/dashboard";
  };

  const getDashboardText = () => {
    if (isSuperAdmin) return "Super Admin";
    if (isProAdmin) return "Pro Admin";
    if (isAdmin) return "Admin";
    return "Dashboard";
  };
  
  return (
    <header className="bg-[#0D1117] border-b border-[#30363D] py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={logoUrl || defaultLogoUrl} 
              alt="Platform Logo" 
              className="h-8 w-auto mr-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultLogoUrl;
                target.onerror = () => {
                  target.style.display = 'none';
                };
              }}
            />
            <span className="text-2xl font-bold text-[#1EAEDB]">AI Agent</span>
          </Link>
          <nav className="ml-8 hidden md:flex space-x-4">
            {user && (
              <Link 
                to={getDashboardLink()} 
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm ${
                  (isSuperAdmin || isProAdmin) ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20' : ''
                }`}
              >
                {getDashboardText()}
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user && <TokenDisplay />}
          {!user && (
            <Link to="/auth" className="flex items-center">
              <Button 
                variant="outline" 
                className="border-[#30363D] bg-[#1C2128] text-white hover:bg-[#161B22] hover:text-[#1EAEDB] mr-2"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button className="bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white">
                Sign Up
              </Button>
            </Link>
          )}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};