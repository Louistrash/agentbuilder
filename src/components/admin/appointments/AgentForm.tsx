
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Agent } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AvailableDays } from "./components/AvailableDays";
import { BusinessHours } from "./components/BusinessHours";

interface AgentFormProps {
  agent?: Agent;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const AgentForm = ({ agent, isOpen, onClose, onSave }: AgentFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: agent?.name || "",
    email: agent?.email || "",
    bio: agent?.bio || "",
    is_active: agent?.is_active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (agent?.id) {
        // Update existing agent
        const { error } = await supabase
          .from('agents')
          .update(formData)
          .eq('id', agent.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Agent updated successfully.",
        });
      } else {
        // Create new agent
        const { error } = await supabase
          .from('agents')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Agent created successfully.",
        });
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving agent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save agent details.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{agent ? "Edit Agent" : "Add New Agent"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : agent ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
