/*
  # Appointments System Schema

  1. New Tables
    - `agents`
      - Chat agents that handle appointments
    - `agent_availability`
      - Agent working hours and availability
    - `appointments`
      - Scheduled appointments
    - `appointment_settings`
      - Global appointment settings

  2. Security
    - Enable RLS
    - Add policies for appointment management
    
  3. Changes
    - Initial appointments system setup
*/

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  email text NOT NULL,
  bio text,
  profile_image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active agents"
  ON agents FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Only admins can manage agents"
  ON agents
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Agent Availability table
CREATE TABLE IF NOT EXISTS agent_availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id uuid REFERENCES agents(id),
  available_days integer[],
  time_slots jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agent_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view agent availability"
  ON agent_availability FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage availability"
  ON agent_availability
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  agent_id uuid REFERENCES agents(id),
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Appointment Settings table
CREATE TABLE IF NOT EXISTS appointment_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  available_days integer[],
  time_slots jsonb,
  max_appointments_per_day integer DEFAULT 8,
  min_notice_hours integer DEFAULT 24,
  max_advance_days integer DEFAULT 30,
  appointment_duration integer DEFAULT 60,
  break_between_appointments integer DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointment_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view appointment settings"
  ON appointment_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage settings"
  ON appointment_settings
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Update triggers
CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_availability_updated_at
    BEFORE UPDATE ON agent_availability
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointment_settings_updated_at
    BEFORE UPDATE ON appointment_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();