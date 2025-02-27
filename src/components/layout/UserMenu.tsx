
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, UserCog, Shield } from "lucide-react";

const CEO_EMAIL = "patricknieborg@me.com";

export const UserMenu = () => {
  const { user } = useAuth();
  const { isAdmin, isCEO } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing you out.",
        variant: "destructive",
      });
    }
  };

  const getInitials = () => {
    if (!user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const isCEOUser = user.email === CEO_EMAIL || isCEO;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-[#30363D] hover:border-[#1EAEDB]/50 transition-colors">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-[#161B22] text-[#1EAEDB]">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-[#0D1117] border-[#30363D] text-white z-50" 
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.email}</p>
            {isCEOUser && (
              <p className="text-xs text-[#1EAEDB] flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                CEO Account
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#30363D]" />
        
        {isCEOUser && (
          <>
            <DropdownMenuItem
              className="cursor-pointer text-white hover:bg-[#161B22] focus:bg-[#161B22]"
              onClick={() => {
                setIsOpen(false);
                navigate("/admin");
              }}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              className="cursor-pointer text-white hover:bg-[#161B22] focus:bg-[#161B22]"
              onClick={() => {
                setIsOpen(false);
                navigate("/agent-manager");
              }}
            >
              <UserCog className="mr-2 h-4 w-4" />
              <span>Agent Manager</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-[#30363D]" />
          </>
        )}
        
        <DropdownMenuItem
          className="cursor-pointer text-white hover:bg-[#161B22] focus:bg-[#161B22]"
          onClick={() => {
            setIsOpen(false);
            navigate("/profile");
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-white hover:bg-[#161B22] focus:bg-[#161B22]"
          onClick={() => {
            setIsOpen(false);
            navigate("/settings");
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#30363D]" />
        <DropdownMenuItem
          className="cursor-pointer text-white hover:bg-[#161B22] focus:bg-[#161B22]"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
