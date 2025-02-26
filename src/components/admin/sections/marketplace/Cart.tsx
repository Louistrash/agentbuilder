
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CartProps } from "./types";

export const Cart = ({ 
  showCart, 
  setShowCart, 
  cart, 
  features, 
  removeFromCart, 
  getCartTotal, 
  handleCheckout 
}: CartProps) => {
  if (!showCart || cart.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Shopping Cart</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowCart(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {features
            .filter(feature => cart.includes(feature.id))
            .map(feature => (
              <div key={feature.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">{feature.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">${feature.price}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(feature.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-lg font-bold">${getCartTotal()}</p>
          </div>
          <Button onClick={handleCheckout}>
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
