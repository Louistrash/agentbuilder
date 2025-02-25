
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserRole = "admin" | "moderator" | "user";

interface UserRoleSelectProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const UserRoleSelect = ({ currentRole, onRoleChange }: UserRoleSelectProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Role</Label>
        <Select
          onValueChange={onRoleChange}
          defaultValue={currentRole}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
