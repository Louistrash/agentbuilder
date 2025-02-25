
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
      <Card className="bg-[#222939]/95 border-[#1EAEDB]/10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens Granted</CardTitle>
          <IconWrapper>
            <Coins className="h-5 w-5 text-[#1EAEDB]" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGranted}</div>
          <p className="text-xs text-muted-foreground">
            Platform-wide token allocation
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-[#222939]/95 border-[#1EAEDB]/10 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens Spent</CardTitle>
          <IconWrapper>
            <TrendingDown className="h-5 w-5 text-[#1EAEDB]" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSpent}</div>
          <p className="text-xs text-muted-foreground">
            Tokens used for features
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#222939]/95 border-[#1EAEDB]/10 shadow-lg sm:col-span-2 lg:col-span-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1EAEDB]/5 to-transparent pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Tokens</CardTitle>
          <IconWrapper>
            <TrendingUp className="h-5 w-5 text-[#1EAEDB]" />
          </IconWrapper>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGranted - stats.totalSpent}</div>
          <p className="text-xs text-muted-foreground">
            Currently active tokens
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
