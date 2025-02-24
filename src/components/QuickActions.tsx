
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare } from "lucide-react";

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
    <div className="flex md:flex-row flex-col gap-2 px-4">
      {actions.slice(0, maxActions).map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 md:flex-1 min-w-0 bg-white/50 backdrop-blur-sm border border-gray-200
                     text-[#18344A] shadow-sm rounded-2xl 
                     transition-all duration-200 ease-out px-4 py-2 h-auto min-h-[40px]
                     hover:bg-white/70 hover:shadow-md hover:scale-[1.02]
                     active:scale-95 active:shadow-inner
                     bg-gradient-to-b from-white/80 to-white/40
                     text-sm leading-tight
                     md:justify-center justify-start"
          onClick={() => onActionClick(action.action)}
        >
          <MessageSquare className="h-4 w-4 shrink-0 md:hidden" />
          <span className="truncate">{action.text}</span>
        </Button>
      ))}
    </div>
  );
};
