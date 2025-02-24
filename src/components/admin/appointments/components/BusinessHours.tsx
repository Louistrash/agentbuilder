
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeSlot } from "../types";

interface BusinessHoursProps {
  timeSlot: TimeSlot;
  onTimeChange: (field: keyof TimeSlot, value: string) => void;
}

export const BusinessHours = ({ timeSlot, onTimeChange }: BusinessHoursProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="businessHours">Business Hours</Label>
      <div className="flex items-center space-x-2">
        <Input
          id="startTime"
          type="time"
          value={timeSlot.start}
          onChange={(e) => onTimeChange('start', e.target.value)}
        />
        <span>to</span>
        <Input
          id="endTime"
          type="time"
          value={timeSlot.end}
          onChange={(e) => onTimeChange('end', e.target.value)}
        />
      </div>
    </div>
  );
};
