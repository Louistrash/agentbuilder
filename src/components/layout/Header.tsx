import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { TokenDisplay } from "./TokenDisplay";
import { UserMenu } from "./UserMenu";
interface HeaderProps {
  logoUrl?: string | null;
}
export const Header = ({
  logoUrl
}: HeaderProps) => {
  const {
    user
  } = useAuth();
  return <header className="bg-[#0D1117] border-b border-[#30363D] py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            {logoUrl ? <img src={logoUrl} alt="Logo" className="h-8 w-auto" /> : <span className="text-2xl font-bold text-[#1EAEDB]">AI Agent</span>}
          </Link>
          <nav className="ml-8 hidden md:flex space-x-4">
            
            {user && <Link to="/agent-manager" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm">
                My Agents
              </Link>}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user && <TokenDisplay />}
          <UserMenu />
        </div>
      </div>
    </header>;
};