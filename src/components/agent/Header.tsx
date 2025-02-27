
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Agent Builder</h1>
        <div className="bg-gradient-to-r from-[#FEC6A1] to-[#FDB8A3] px-2 py-0.5 rounded-md text-xs text-[#0D1117] font-medium">
          Free
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" className="border-[#30363D] bg-[#1C2128] text-white hidden sm:flex gap-1">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          Upgrade to Pro
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full w-8 h-8 p-0">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2 bg-[#161B22] border-[#30363D] text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#30363D]" />
            <DropdownMenuItem className="hover:bg-[#30363D]">
              <Link to="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#30363D]">
              <Link to="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#30363D]">
              <Link to="/billing" className="w-full">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#30363D]" />
            <DropdownMenuItem className="hover:bg-[#30363D] text-red-400">
              <Link to="/auth" className="w-full">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
