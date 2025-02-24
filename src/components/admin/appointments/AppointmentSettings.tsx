
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

export const AppointmentSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    available_days: [1, 2, 3, 4, 5],
    time_slots: [{ start: "09:00", end: "17:00" }],
    max_appointments_per_day: 8,
    min_notice_hours: 24,
    max_advance_days: 30,
    appointment_duration: 60,
    break_between_appointments: 15
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('appointment_settings')
        .select('*')
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load appointment settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('appointment_settings')
        .update(settings)
        .eq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Appointment settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save appointment settings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (day: number) => {
    setSettings(prev => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter(d => d !== day)
        : [...prev.available_days, day].sort()
    }));
  };

  const weekDays = [
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
    { value: 0, label: "Sun" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Days</h3>
        <div className="flex flex-wrap gap-4">
          {weekDays.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <Switch
                id={`day-${value}`}
                checked={settings.available_days.includes(value)}
                onCheckedChange={() => toggleDay(value)}
              />
              <Label htmlFor={`day-${value}`}>{label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessHours">Business Hours</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="startTime"
              type="time"
              value={settings.time_slots[0].start}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                time_slots: [{ ...prev.time_slots[0], start: e.target.value }]
              }))}
            />
            <span>to</span>
            <Input
              id="endTime"
              type="time"
              value={settings.time_slots[0].end}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                time_slots: [{ ...prev.time_slots[0], end: e.target.value }]
              }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxAppointments">Max Appointments per Day</Label>
          <Input
            id="maxAppointments"
            type="number"
            min="1"
            value={settings.max_appointments_per_day}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              max_appointments_per_day: parseInt(e.target.value)
            }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="appointmentDuration">Appointment Duration (minutes)</Label>
          <Input
            id="appointmentDuration"
            type="number"
            min="15"
            step="15"
            value={settings.appointment_duration}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              appointment_duration: parseInt(e.target.value)
            }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="breakBetween">Break Between Appointments (minutes)</Label>
          <Input
            id="breakBetween"
            type="number"
            min="0"
            step="5"
            value={settings.break_between_appointments}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              break_between_appointments: parseInt(e.target.value)
            }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minNotice">Minimum Notice (hours)</Label>
          <Input
            id="minNotice"
            type="number"
            min="0"
            value={settings.min_notice_hours}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              min_notice_hours: parseInt(e.target.value)
            }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxAdvance">Maximum Advance Booking (days)</Label>
          <Input
            id="maxAdvance"
            type="number"
            min="1"
            value={settings.max_advance_days}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              max_advance_days: parseInt(e.target.value)
            }))}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};
