
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AvailableDays } from "./components/AvailableDays";
import { BusinessHours } from "./components/BusinessHours";
import { TimeSlot, AgentAvailability } from "./types";

interface AgentAvailabilityFormProps {
  agentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AgentAvailabilityForm = ({
  agentId,
  isOpen,
  onClose,
}: AgentAvailabilityFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<Partial<AgentAvailability>>({
    agent_id: agentId,
    available_days: [1, 2, 3, 4, 5],
    time_slots: [{ start: "09:00", end: "17:00" }],
  });

  useEffect(() => {
    loadAvailability();
  }, [agentId]);

  const loadAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_availability')
        .select('*')
        .eq('agent_id', agentId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setAvailability(data);
      }
    } catch (error) {
      console.error('Error loading availability:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load agent availability.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: existing } = await supabase
        .from('agent_availability')
        .select('id')
        .eq('agent_id', agentId)
        .single();

      if (existing) {
        // Update existing availability
        const { error } = await supabase
          .from('agent_availability')
          .update(availability)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new availability
        const { error } = await supabase
          .from('agent_availability')
          .insert([availability]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Availability settings saved successfully.",
      });
      onClose();
    } catch (error) {
      console.error('Error saving availability:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save availability settings.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeChange = (field: keyof TimeSlot, value: string) => {
    setAvailability(prev => ({
      ...prev,
      time_slots: [{ ...prev.time_slots![0], [field]: value }],
    }));
  };

  const toggleDay = (day: number) => {
    setAvailability(prev => ({
      ...prev,
      available_days: prev.available_days?.includes(day)
        ? prev.available_days.filter(d => d !== day)
        : [...(prev.available_days || []), day].sort(),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agent Availability Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AvailableDays
            availableDays={availability.available_days || []}
            onToggleDay={toggleDay}
          />

          <BusinessHours
            timeSlot={availability.time_slots?.[0] || { start: "09:00", end: "17:00" }}
            onTimeChange={handleTimeChange}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
