
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  return (
    <div className="quick-actions">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("products")}
        >
          Producten
        </Button>
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("book")}
        >
          Afspraak Maken
        </Button>
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("sleep")}
        >
          Slaaptips
        </Button>
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("contact")}
        >
          Contact
        </Button>
      </div>
    </div>
  );
};
