
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface UsageStatsProps {
  totalWordsUsed: number;
  wordsLimit: number;
}

export const UsageStats = ({ totalWordsUsed, wordsLimit }: UsageStatsProps) => {
  const usagePercentage = (totalWordsUsed / wordsLimit) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Storage Usage</span>
        <span>{Math.round(usagePercentage)}%</span>
      </div>
      <Progress 
        value={usagePercentage} 
        className="h-2"
      />
      <div className="flex items-start gap-2 text-sm text-amber-600">
        <AlertCircle className="h-4 w-4 mt-0.5" />
        <p>
          Using {totalWordsUsed.toLocaleString()} of {wordsLimit.toLocaleString()} words.
          {totalWordsUsed >= wordsLimit * 0.9 && 
            " Consider upgrading your plan to ensure uninterrupted service."}
        </p>
      </div>
    </div>
  );
};
