
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { UserTableRow } from "./users/UserTableRow";
import { UserFilters } from "./users/UserFilters";
import { BulkActions } from "./users/BulkActions";
import { useUsers } from "@/hooks/useUsers";

export const UsersSection = () => {
  const { users, loading, fetchUsers, updateUserRole, deleteUsers, updateUsersRole } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleBulkAction = async (action: 'delete' | 'role', role?: string) => {
    if (selectedUsers.length === 0) return;

    let success = false;
    if (action === 'role' && role) {
      success = await updateUsersRole(selectedUsers, role);
    } else if (action === 'delete') {
      success = await deleteUsers(selectedUsers);
    }

    if (success) {
      setSelectedUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <UserFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        <BulkActions 
          selectedCount={selectedUsers.length}
          onAction={handleBulkAction}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onCheckedChange={(checked) => 
                  setSelectedUsers(checked === true ? filteredUsers.map(user => user.id) : [])
                }
                aria-label="Select all users"
              />
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              selected={selectedUsers.includes(user.id)}
              onSelect={(checked) => 
                setSelectedUsers(prev => 
                  checked ? [...prev, user.id] : prev.filter(id => id !== user.id)
                )
              }
              onUpdateRole={(role) => updateUserRole(user.id, role)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
