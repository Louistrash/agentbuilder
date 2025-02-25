
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent } from "./types";

interface Appointment {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  agent_id?: string;
}

export const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    if (date) {
      loadAppointments(format(date, 'yyyy-MM-dd'));
    }
  }, [date, selectedAgent]);

  const loadAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('name');

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error loading agents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load agents.",
      });
    }
  };

  const loadAppointments = async (selectedDate: string) => {
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .eq('appointment_date', selectedDate)
        .order('start_time');

      if (selectedAgent !== 'all') {
        query = query.eq('agent_id', selectedAgent);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const typedAppointments = (data || []).map(apt => ({
        ...apt,
        status: apt.status as 'pending' | 'confirmed' | 'cancelled' | 'completed'
      }));
      
      setAppointments(typedAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load appointments.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentName = (agentId: string | undefined) => {
    if (!agentId) return 'Unassigned';
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.name : 'Unknown Agent';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-auto">
          <div className="mb-4">
            <Select
              value={selectedAgent}
              onValueChange={setSelectedAgent}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">
            Appointments for {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
          </h3>
          
          {isLoading ? (
            <div>Loading appointments...</div>
          ) : appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{appointment.customer_name}</h4>
                      <p className="text-sm text-gray-500">
                        {appointment.start_time} - {appointment.end_time}
                      </p>
                      <p className="text-sm text-gray-500">
                        Agent: {getAgentName(appointment.agent_id)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointments scheduled for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};
