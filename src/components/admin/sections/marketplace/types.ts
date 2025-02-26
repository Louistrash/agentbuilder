
export interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

export interface PurchasedFeature {
  id: string;
  feature_id: string;
  status: string;
  activated_at: string | null;
}

export interface CartProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cart: string[];
  features: Feature[];
  removeFromCart: (featureId: string) => void;
  getCartTotal: () => string;
  handleCheckout: () => void;
}

export interface FeatureCardProps {
  feature: Feature;
  isFeaturePurchased: (featureId: string) => boolean;
  cart: string[];
  removeFromCart: (featureId: string) => void;
  addToCart: (featureId: string) => void;
}

export interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}
