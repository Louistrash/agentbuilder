
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
  const { isAdmin, isSuperAdmin, isCEO } = useAdmin();
  
  return <header className="bg-[#0D1117] border-b border-[#30363D] py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Platform Logo" className="h-8 w-auto mr-2" />
            <span className="text-2xl font-bold text-[#1EAEDB]">AI Agent</span>
          </Link>
          <nav className="ml-8 hidden md:flex space-x-4">
            {user && <Link to="/agent-manager" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm">
                My Agents
              </Link>}
            {user && !isAdmin && <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm">
                User Dashboard
              </Link>}
            {isAdmin && !isCEO && <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm">
                Admin Dashboard
              </Link>}
            {isAdmin && <Link to="/pro-admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 rounded-md">
                PRO Admin
              </Link>}
            {isCEO && <Link to="/admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 rounded-md">
                CEO Dashboard
              </Link>}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user && <TokenDisplay />}
          {!user && (
            <Link to="/auth" className="flex items-center">
              <Button 
                variant="outline" 
                className="bg-transparent border-[#30363D] text-white hover:bg-[#161B22] hover:text-[#1EAEDB] mr-2"
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
    </header>;
};
