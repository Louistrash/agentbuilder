
import { AppointmentSettings } from "../appointments/AppointmentSettings";
import { AppointmentCalendar } from "../appointments/AppointmentCalendar";
import { AgentsList } from "../appointments/AgentsList";
import { Separator } from "@/components/ui/separator";

export const AppointmentsSection = () => {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Agents</h2>
        <p className="text-gray-600">Manage appointment agents and their availability.</p>
        <AgentsList />
      </section>

      <Separator className="my-6" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Appointment Settings</h2>
        <p className="text-gray-600">Configure appointment booking rules and availability.</p>
        <AppointmentSettings />
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold">Appointment Calendar</h2>
        <p className="text-gray-600">View and manage scheduled appointments.</p>
        <AppointmentCalendar />
      </section>
    </div>
  );
};
