
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
          Products
        </Button>
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("book")}
        >
          Book Appointment
        </Button>
        <Button
          variant="outline"
          className="bg-luxury-50 hover:bg-luxury-100 text-luxury-900 border-luxury-200"
          onClick={() => onActionClick("sleep")}
        >
          Sleep Tips
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
