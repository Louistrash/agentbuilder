
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { loadStripe } from "@stripe/stripe-js";
import { CategoryFilter } from "./marketplace/CategoryFilter";
import { FeatureCard } from "./marketplace/FeatureCard";
import { Cart } from "./marketplace/Cart";
import { Feature, PurchasedFeature } from "./marketplace/types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const MarketplaceSection = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [purchasedFeatures, setPurchasedFeatures] = useState<PurchasedFeature[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const categories = ["all", "analytics", "integration", "automation", "customization"];

  useEffect(() => {
    fetchFeatures();
    if (user) {
      fetchPurchasedFeatures();
    }
  }, [user]);

  const fetchFeatures = async () => {
    const { data, error } = await supabase
      .from('marketplace_features')
      .select('*')
      .eq('status', 'active');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch features",
        variant: "destructive",
      });
      return;
    }

    setFeatures(data);
  };

  const fetchPurchasedFeatures = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('purchased_features')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch purchased features",
        variant: "destructive",
      });
      return;
    }

    setPurchasedFeatures(data);
  };

  const addToCart = (featureId: string) => {
    if (!cart.includes(featureId)) {
      setCart([...cart, featureId]);
      toast({
        title: "Added to cart",
        description: "Feature has been added to your cart",
      });
    }
  };

  const removeFromCart = (featureId: string) => {
    setCart(cart.filter(id => id !== featureId));
    toast({
      title: "Removed from cart",
      description: "Feature has been removed from your cart",
    });
  };

  const getCartTotal = () => {
    return features
      .filter(feature => cart.includes(feature.id))
      .reduce((total, feature) => total + feature.price, 0)
      .toFixed(2);
  };

  const isFeaturePurchased = (featureId: string) => {
    return purchasedFeatures.some(pf => pf.feature_id === featureId);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to make purchases",
        variant: "destructive",
      });
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/marketplace-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          cart,
          successUrl: `${window.location.origin}/admin?tab=marketplace&status=success`,
          cancelUrl: `${window.location.origin}/admin?tab=marketplace&status=cancelled`,
        }),
      });

      const { sessionId, error } = await response.json();
      
      if (error) throw new Error(error);
      
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to initiate checkout",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    
    if (status === 'success') {
      toast({
        title: "Purchase Successful",
        description: "Your features have been purchased successfully",
      });
      fetchPurchasedFeatures();
    } else if (status === 'cancelled') {
      toast({
        title: "Purchase Cancelled",
        description: "Your purchase has been cancelled",
        variant: "destructive",
      });
    }

    // Clean up URL
    if (status) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const filteredFeatures = selectedCategory === "all"
    ? features
    : features.filter(feature => feature.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feature Marketplace</h2>
          <p className="text-muted-foreground">Enhance your virtual agent with powerful features</p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart className="h-4 w-4" />
          Cart ({cart.length}) - ${getCartTotal()}
        </Button>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isFeaturePurchased={isFeaturePurchased}
            cart={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
          />
        ))}
      </div>

      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        features={features}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};
