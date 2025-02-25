
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

interface User {
  id: string;
  email: string;
  roles: string[];
}

export const UsersSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();
      if (usersError) throw usersError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');
      if (rolesError) throw rolesError;

      const userList = users.map(user => ({
        id: user.id,
        email: user.email || '',
        roles: roles
          .filter(r => r.user_id === user.id)
          .map(r => r.role) || []
      }));

      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: role as 'admin' | 'moderator' | 'user'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User role updated successfully",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const handleBulkAction = async (action: 'delete' | 'role', role?: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select users to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      if (action === 'role' && role) {
        const promises = selectedUsers.map(userId => 
          supabase
            .from('user_roles')
            .upsert({ user_id: userId, role: role as 'admin' | 'moderator' | 'user' })
        );
        
        await Promise.all(promises);
        
        toast({
          title: "Success",
          description: `Updated roles for ${selectedUsers.length} users`,
        });
      } else if (action === 'delete') {
        for (const userId of selectedUsers) {
          const { error } = await supabase.auth.admin.deleteUser(userId);
          if (error) throw error;
        }
        
        toast({
          title: "Success",
          description: `Deleted ${selectedUsers.length} users`,
        });
      }

      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      toast({
        title: "Error",
        description: "Failed to perform bulk action",
        variant: "destructive",
      });
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
