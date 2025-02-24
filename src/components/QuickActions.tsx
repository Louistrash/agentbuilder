
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
  const [maxActions, setMaxActions] = useState<number>(4);

  useEffect(() => {
    fetchActions();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from('bot_settings')
      .select('*')
      .single();

    if (data) {
      // Safely access the property and provide a default value
      setMaxActions(data.number_of_quick_actions ?? 4);
    }
  };

  const fetchActions = async () => {
    const { data, error } = await supabase
      .from('quick_actions')
      .select('*')
      .order('order_index')
      .limit(4);

    if (!error && data) {
      setActions(data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 px-1">
      {actions.slice(0, maxActions).map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="bg-white/50 backdrop-blur-sm border border-gray-200 hover:bg-gray-50 
                     text-[#18344A] shadow-sm rounded-2xl transition-all 
                     active:scale-95 w-full md:flex-1"
          onClick={() => onActionClick(action.action)}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
};
