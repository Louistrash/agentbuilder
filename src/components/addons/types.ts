
// Define shared types for the addons marketplace
export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'automation' | 'communication' | 'customization' | 'analytics' | 'integration';
  icon_name: string;
  features: string[];
  is_premium: boolean;
  status: string;
}

export interface PurchasedAddon {
  id: string;
  addon_id: string;
  profile_id: string;
  agent_id: string | null;
  status: string;
  purchased_at: string;
  activated_at: string | null;
}
