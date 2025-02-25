
import { Instagram } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

interface InstagramIntegrationProps {
  token: string;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InstagramIntegration = ({
  token,
  onTokenChange,
  onSubmit,
  isLoading,
}: InstagramIntegrationProps) => {
  return (
    <IntegrationCard
      title="Instagram Integration"
      description="Connect with Instagram Direct Messages for customer support"
      icon={Instagram}
      token={token}
      onTokenChange={onTokenChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      inputLabel="Instagram Access Token"
      inputDescription="Available in your Instagram Business settings"
      inputPlaceholder="Enter your Instagram API token"
    />
  );
};
