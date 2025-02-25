
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "analytics" | "integration" | "automation" | "customization";
}

const features: Feature[] = [
  {
    id: "1",
    name: "Advanced Analytics",
    description: "Get deep insights into your virtual agent's performance with detailed metrics and visualizations.",
    price: 29.99,
    category: "analytics",
  },
  {
    id: "2",
    name: "Multi-Channel Integration",
    description: "Connect your virtual agent with popular messaging platforms and social media.",
    price: 49.99,
    category: "integration",
  },
  {
    id: "3",
    name: "Custom Workflows",
    description: "Create sophisticated automation workflows with a visual builder.",
    price: 39.99,
    category: "automation",
  },
  {
    id: "4",
    name: "Personality Customization",
    description: "Fine-tune your agent's personality and responses with advanced settings.",
    price: 19.99,
    category: "customization",
  },
];

export const MarketplaceSection = () => {
  const [cart, setCart] = useState<string[]>([]);
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feature Marketplace</h2>
          <p className="text-muted-foreground">Enhance your virtual agent with powerful features</p>
        </div>
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Cart ({cart.length}) - ${getCartTotal()}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{feature.name}</CardTitle>
                <Badge>{feature.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-lg font-bold">${feature.price}</span>
              {cart.includes(feature.id) ? (
                <Button 
                  variant="destructive" 
                  onClick={() => removeFromCart(feature.id)}
                >
                  Remove
                </Button>
              ) : (
                <Button 
                  onClick={() => addToCart(feature.id)} 
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
