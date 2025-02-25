
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, TrendingUp, TrendingDown } from "lucide-react";
import { TokenStats } from "./types";

export const TokenStatsCards = ({ stats }: { stats: TokenStats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens Granted</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalGranted}</div>
          <p className="text-xs text-muted-foreground">
            Platform-wide token allocation
          </p>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens Spent</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSpent}</div>
          <p className="text-xs text-muted-foreground">
            Tokens used for features
          </p>
        </CardContent>
      </Card>

      <Card className="w-full sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Tokens</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
