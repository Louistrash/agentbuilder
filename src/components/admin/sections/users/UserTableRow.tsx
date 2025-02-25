
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { UserRoleSelect } from "./UserRoleSelect";

type UserRole = "admin" | "moderator" | "user";

interface User {
  id: string;
  email: string;
  roles: UserRole[];
}

interface UserTableRowProps {
  user: User;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onUpdateRole: (role: UserRole) => void;
}

export const UserTableRow = ({
  user,
  selected,
  onSelect,
  onUpdateRole,
}: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox 
          checked={selected}
          onCheckedChange={(checked) => onSelect(checked === true)}
          aria-label={`Select user ${user.email}`}
        />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.roles.join(', ') || 'No roles'}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
              Manage Roles
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage User Roles</DialogTitle>
            </DialogHeader>
            <UserRoleSelect 
              currentRole={user.roles[0] || 'user'}
              onRoleChange={onUpdateRole}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};
