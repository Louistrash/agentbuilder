
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

interface QuickAction {
  id: string;
  text: string;
  action: string;
  order_index: number;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const [actions, setActions] = useState<QuickAction[]>([]);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    const { data, error } = await supabase
      .from('quick_actions')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Error loading quick actions:', error);
      return;
    }

    if (data) {
      setActions(data);
    }
  };

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
