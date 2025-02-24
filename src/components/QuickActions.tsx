
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

interface QuickAction {
  id: string;
  text: string;
  action: string;
}

const defaultActions: QuickAction[] = [
  { id: "products", text: "Vertel me over uw luxe matrassen", action: "products" },
  { id: "book", text: "Showroom bezoek inplannen", action: "book" },
  { id: "sleep", text: "Expert slaaptips", action: "sleep" },
  { id: "contact", text: "Contactgegevens & locatie", action: "contact" },
];

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const [actions, setActions] = useState<QuickAction[]>(defaultActions);

  useEffect(() => {
    const savedActions = localStorage.getItem('quickActions');
    if (savedActions) {
      try {
        setActions(JSON.parse(savedActions));
      } catch (error) {
        console.error('Error loading quick actions:', error);
      }
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          className="bg-luxury-50 border-luxury-200 hover:bg-luxury-100"
          onClick={() => onActionClick(action.action)}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
};
