
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { AvailableDays } from "./components/AvailableDays";
import { BusinessHours } from "./components/BusinessHours";
import { NumericSetting } from "./components/NumericSetting";
import { AppointmentSettings as Settings, DEFAULT_SETTINGS, TimeSlot } from "./types";
import { Json } from "@/integrations/supabase/types";

export const AppointmentSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

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
      if (data) {
        const timeSlots = Array.isArray(data.time_slots) 
          ? (data.time_slots as TimeSlot[])
          : DEFAULT_SETTINGS.time_slots;

        setSettings({
          available_days: data.available_days || DEFAULT_SETTINGS.available_days,
          time_slots: timeSlots,
          max_appointments_per_day: data.max_appointments_per_day,
          min_notice_hours: data.min_notice_hours,
          max_advance_days: data.max_advance_days,
          appointment_duration: data.appointment_duration,
          break_between_appointments: data.break_between_appointments,
        });
      }
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
        .update({
          ...settings,
          time_slots: settings.time_slots as any // Required for Supabase JSON column
        })
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

  const handleTimeSlotChange = (field: keyof TimeSlot, value: string) => {
    setSettings(prev => ({
      ...prev,
      time_slots: [{ ...prev.time_slots[0], [field]: value }]
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <AvailableDays 
        availableDays={settings.available_days}
        onToggleDay={toggleDay}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BusinessHours
          timeSlot={settings.time_slots[0]}
          onTimeChange={handleTimeSlotChange}
        />

        <NumericSetting
          id="maxAppointments"
          label="Max Appointments per Day"
          value={settings.max_appointments_per_day}
          onChange={(value) => setSettings(prev => ({ ...prev, max_appointments_per_day: value }))}
          min={1}
        />

        <NumericSetting
          id="appointmentDuration"
          label="Appointment Duration (minutes)"
          value={settings.appointment_duration}
          onChange={(value) => setSettings(prev => ({ ...prev, appointment_duration: value }))}
          min={15}
          step={15}
        />

        <NumericSetting
          id="breakBetween"
          label="Break Between Appointments (minutes)"
          value={settings.break_between_appointments}
          onChange={(value) => setSettings(prev => ({ ...prev, break_between_appointments: value }))}
          min={0}
          step={5}
        />

        <NumericSetting
          id="minNotice"
          label="Minimum Notice (hours)"
          value={settings.min_notice_hours}
          onChange={(value) => setSettings(prev => ({ ...prev, min_notice_hours: value }))}
          min={0}
        />

        <NumericSetting
          id="maxAdvance"
          label="Maximum Advance Booking (days)"
          value={settings.max_advance_days}
          onChange={(value) => setSettings(prev => ({ ...prev, max_advance_days: value }))}
          min={1}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};
