import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, UserCog, Shield, Trash2 } from "lucide-react";

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

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(user => user.id) : []);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    setSelectedUsers(prev => 
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
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
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedUsers.length} selected
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserCog className="h-4 w-4 mr-2" />
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction('role', 'admin')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('role', 'moderator')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Make Moderator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('role', 'user')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Make User
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => handleBulkAction('delete')}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onCheckedChange={(checked) => handleSelectAll(checked === true)}
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
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) => handleSelectUser(user.id, checked === true)}
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
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          onValueChange={(value) => updateUserRole(user.id, value)}
                          defaultValue={user.roles[0] || 'user'}
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
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
