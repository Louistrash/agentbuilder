
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Appointment {
  id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (date) {
      loadAppointments(format(date, 'yyyy-MM-dd'));
    }
  }, [date]);

  const loadAppointments = async (selectedDate: string) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('appointment_date', selectedDate)
        .order('start_time');

      if (error) throw error;
      setAppointments(data || []);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-auto">
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
