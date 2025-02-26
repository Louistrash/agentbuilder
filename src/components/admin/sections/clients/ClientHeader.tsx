
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, ShieldCheck, Coins } from "lucide-react";
import { UserData } from "./types";

interface ClientHeaderProps {
  userData: UserData | undefined;
}

export const ClientHeader = ({ userData }: ClientHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-white">Client Dashboard</h2>
        <p className="text-sm text-gray-400">Manage your agent features and access levels</p>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="bg-[#1A1F2C] px-3 py-1.5">
          <Coins className="w-4 h-4 mr-2 text-yellow-500" />
          {userData?.tokens} tokens
        </Badge>
        <Badge 
          variant="outline" 
          className={`px-3 py-1.5 ${
            userData?.role === 'ceo' 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : userData?.role === 'master'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
              : 'bg-[#1A1F2C]'
          }`}
        >
          {userData?.role === 'ceo' ? (
            <Crown className="w-4 h-4 mr-2" />
          ) : userData?.role === 'master' ? (
            <ShieldCheck className="w-4 h-4 mr-2" />
          ) : (
            <Shield className="w-4 h-4 mr-2" />
          )}
          {userData?.role.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
};
