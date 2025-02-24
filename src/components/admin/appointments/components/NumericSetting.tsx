
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumericSettingProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
}

export const NumericSetting = ({ 
  id, 
  label, 
  value, 
  onChange, 
  min = 0, 
  step = 1 
}: NumericSettingProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};
