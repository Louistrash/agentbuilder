
import { Json } from "@/integrations/supabase/types";

export interface TimeSlot {
  start: string;
  end: string;
}

export interface AppointmentSettings {
  available_days: number[];
  time_slots: TimeSlot[];
  max_appointments_per_day: number;
  min_notice_hours: number;
  max_advance_days: number;
  appointment_duration: number;
  break_between_appointments: number;
}

export const DEFAULT_SETTINGS: AppointmentSettings = {
  available_days: [1, 2, 3, 4, 5],
  time_slots: [{ start: "09:00", end: "17:00" }],
  max_appointments_per_day: 8,
  min_notice_hours: 24,
  max_advance_days: 30,
  appointment_duration: 60,
  break_between_appointments: 15
};

export interface Agent {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profile_image_url?: string;
  is_active: boolean;
}

export interface AgentAvailability {
  id: string;
  agent_id: string;
  available_days: number[];
  time_slots: TimeSlot[];
}

export interface WeekDay {
  value: number;
  label: string;
}

export const WEEK_DAYS: WeekDay[] = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 0, label: "Sun" },
];
