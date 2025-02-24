
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export const QuickActionsSettings = () => {
  const [actions, setActions] = useState<QuickAction[]>(defaultActions);
  const { toast } = useToast();

  const handleAdd = () => {
    const newAction: QuickAction = {
      id: crypto.randomUUID(),
      text: "",
      action: "",
    };
    setActions([...actions, newAction]);
  };

  const handleRemove = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const handleChange = (id: string, field: keyof QuickAction, value: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, [field]: value } : action
    ));
  };

  const handleSave = () => {
    // For now, we'll just save to localStorage since these are static options
    // In a future iteration, we could move this to the database if needed
    try {
      localStorage.setItem('quickActions', JSON.stringify(actions));
      toast({
        title: "Success",
        description: "Quick actions saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save quick actions.",
      });
    }
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
