
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserData } from "./types";

interface UpgradeSectionProps {
  userData: UserData | undefined;
}

export const UpgradeSection = ({ userData }: UpgradeSectionProps) => {
  const { toast } = useToast();

  const handleUpgradeToMaster = () => {
    toast({
      title: "Upgrade Request",
      description: "Your upgrade request to Master has been submitted for review."
    });
  };

  return (
    <Card className="bg-[#161B22] border-[#30363D]">
      <CardHeader>
        <CardTitle className="text-white">Upgrade to Master Admin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-400">
          Upgrade to Master Admin to unlock additional features and capabilities:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Advanced analytics and reporting</li>
          <li>Multi-agent support</li>
          <li>Priority support access</li>
          <li>Extended API access</li>
        </ul>
        <Button 
          className="w-full mt-4"
          onClick={handleUpgradeToMaster}
          disabled={userData?.role === 'master' || userData?.role === 'ceo'}
        >
          {userData?.role === 'master' ? 'Already a Master Admin' : 
           userData?.role === 'ceo' ? 'CEO Admin' : 'Request Upgrade'}
        </Button>
      </CardContent>
    </Card>
  );
};
