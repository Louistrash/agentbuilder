
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { WEEK_DAYS } from "../types";

interface AvailableDaysProps {
  availableDays: number[];
  onToggleDay: (day: number) => void;
}

export const AvailableDays = ({ availableDays, onToggleDay }: AvailableDaysProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Available Days</h3>
      <div className="flex flex-wrap gap-4">
        {WEEK_DAYS.map(({ value, label }) => (
          <div key={value} className="flex items-center space-x-2">
            <Switch
              id={`day-${value}`}
              checked={availableDays.includes(value)}
              onCheckedChange={() => onToggleDay(value)}
            />
            <Label htmlFor={`day-${value}`}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
