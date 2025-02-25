
import { MessageCircle } from "lucide-react";
import { IntegrationCard } from "./IntegrationCard";

interface WhatsAppIntegrationProps {
  token: string;
  onTokenChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const WhatsAppIntegration = ({
  token,
  onTokenChange,
  onSubmit,
  isLoading,
}: WhatsAppIntegrationProps) => {
  return (
    <IntegrationCard
      title="WhatsApp Integration"
      description="Connect your WhatsApp Business account to interact with customers"
      icon={MessageCircle}
      token={token}
      onTokenChange={onTokenChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
      inputLabel="WhatsApp Business Token"
      inputDescription="Get this from your WhatsApp Business Platform dashboard"
      inputPlaceholder="Enter your WhatsApp Business API token"
    />
  );
};
