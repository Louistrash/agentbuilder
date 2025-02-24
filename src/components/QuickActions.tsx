
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
    <div className="flex flex-row gap-2 px-4">
      {actions.slice(0, maxActions).map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="flex-1 min-w-0 bg-white/50 backdrop-blur-sm border border-gray-200
                     text-[#18344A] shadow-sm rounded-2xl whitespace-nowrap overflow-hidden text-ellipsis
                     transition-all duration-200 ease-out px-3 h-8 text-sm
                     hover:bg-white/70 hover:shadow-md hover:scale-[1.02]
                     active:scale-95 active:shadow-inner
                     bg-gradient-to-b from-white/80 to-white/40"
          onClick={() => onActionClick(action.action)}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
};
