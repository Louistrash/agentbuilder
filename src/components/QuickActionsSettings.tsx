
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface QuickAction {
  id: string;
  text: string;
  action: string;
  order_index: number;
}

export const QuickActionsSettings = () => {
  const [actions, setActions] = useState<QuickAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    const { data, error } = await supabase
      .from('quick_actions')
      .select('*')
      .order('order_index');

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load quick actions.",
      });
      return;
    }

    setActions(data);
  };

  const handleAdd = () => {
    const newAction: QuickAction = {
      id: crypto.randomUUID(),
      text: "",
      action: "",
      order_index: actions.length + 1,
    };
    setActions([...actions, newAction]);
  };

  const handleRemove = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const handleChange = (id: string, field: 'text' | 'action', value: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, [field]: value } : action
    ));
  };

  const handleSave = async () => {
    setIsLoading(true);

    // First, delete all existing actions
    const { error: deleteError } = await supabase
      .from('quick_actions')
      .delete()
      .neq('id', 'placeholder'); // Delete all rows

    if (deleteError) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not update quick actions.",
      });
      return;
    }

    // Then insert all current actions
    const { error: insertError } = await supabase
      .from('quick_actions')
      .insert(actions.map((action, index) => ({
        ...action,
        order_index: index + 1,
      })));

    setIsLoading(false);

    if (insertError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save quick actions.",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Quick actions saved successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {actions.map((action) => (
          <div key={action.id} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Button text"
                value={action.text}
                onChange={(e) => handleChange(action.id, 'text', e.target.value)}
              />
              <Input
                placeholder="Action identifier"
                value={action.action}
                onChange={(e) => handleChange(action.id, 'action', e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleRemove(action.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleAdd}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Quick Action
        </Button>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>Quick actions appear as buttons at the start of each conversation.</p>
        <p>The action identifier should be unique and match the handler in the chat component.</p>
      </div>
    </div>
  );
};
