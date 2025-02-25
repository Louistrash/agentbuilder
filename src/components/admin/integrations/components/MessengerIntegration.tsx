
import { MessageSquare } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

interface MessengerIntegrationProps {
  token: string;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const MessengerIntegration = ({
  token,
  onTokenChange,
  onSubmit,
  isLoading,
}: MessengerIntegrationProps) => {
  return (
    <IntegrationCard
      title="Facebook Messenger"
      description="Integrate with Facebook Messenger for customer communication"
      icon={MessageSquare}
      token={token}
      onTokenChange={onTokenChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      inputLabel="Messenger Access Token"
      inputDescription="Found in your Facebook Developer Console"
      inputPlaceholder="Enter your Facebook Messenger token"
    />
  );
};
