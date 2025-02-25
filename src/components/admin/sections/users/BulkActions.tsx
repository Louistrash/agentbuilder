
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Trash2, UserCog } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onAction: (action: 'delete' | 'role', role?: string) => void;
}

export const BulkActions = ({ selectedCount, onAction }: BulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedCount} selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <UserCog className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onAction('role', 'admin')}>
            <Shield className="h-4 w-4 mr-2" />
            Make Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction('role', 'moderator')}>
            <Shield className="h-4 w-4 mr-2" />
            Make Moderator
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction('role', 'user')}>
            <Shield className="h-4 w-4 mr-2" />
            Make User
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-destructive"
            onClick={() => onAction('delete')}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Users
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
