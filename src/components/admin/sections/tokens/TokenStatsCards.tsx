
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, TrendingDown } from "lucide-react";
import { TokenStats } from "./types";
import { motion } from "framer-motion";

const pulseAnimation = {
  initial: { opacity: 0.7, filter: "brightness(0.7)" },
  animate: {
    opacity: [0.7, 1, 0.7],
    filter: ["brightness(0.7)", "brightness(1.2)", "brightness(0.7)"],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={pulseAnimation}
    className="relative"
    style={{
      filter: "drop-shadow(0 0 10px rgba(30, 174, 219, 0.5))",
    }}
  >
    {children}
  </motion.div>
);

export const TokenStatsCards = ({ stats }: { stats: TokenStats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-admin-card border-admin-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-admin-accent-blue/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Tokens Granted</CardTitle>
          <IconWrapper>
            <Coins className="h-5 w-5 text-admin-accent-blue" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.totalGranted}</div>
          <p className="text-xs text-gray-400">
            Platform-wide token allocation
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-admin-card border-admin-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-admin-accent-pink/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Tokens Spent</CardTitle>
          <IconWrapper>
            <TrendingDown className="h-5 w-5 text-admin-accent-pink" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.totalSpent}</div>
          <p className="text-xs text-gray-400">
            Tokens used for features
          </p>
        </CardContent>
      </Card>

      <Card className="bg-admin-card border-admin-border sm:col-span-2 lg:col-span-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-admin-accent-purple/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Available Tokens</CardTitle>
          <IconWrapper>
            <TrendingUp className="h-5 w-5 text-admin-accent-purple" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.totalGranted - stats.totalSpent}</div>
          <p className="text-xs text-gray-400">
            Currently active tokens
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
