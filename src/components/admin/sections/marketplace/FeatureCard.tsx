
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Plus } from "lucide-react";
import { FeatureCardProps } from "./types";

export const FeatureCard = ({ 
  feature, 
  isFeaturePurchased, 
  cart, 
  removeFromCart, 
  addToCart 
}: FeatureCardProps) => {
  return (
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
        {isFeaturePurchased(feature.id) ? (
          <Button variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Purchased
          </Button>
        ) : cart.includes(feature.id) ? (
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
  );
};
