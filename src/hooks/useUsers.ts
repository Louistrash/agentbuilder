
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

export const useUsers = () => {
  const { toast } = useToast();
  
  const fetchUsers = async (): Promise<User[]> => {
    try {
      // First get users with their basic info
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, created_at');

      if (profilesError) throw profilesError;

      // Then get their auth details
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Finally get their roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const users = profiles.map(profile => {
        const authUser = authUsers.users.find(u => u.id === profile.id);
        const roles = userRoles
          .filter(r => r.user_id === profile.id)
          .map(r => r.role);

        return {
          id: profile.id,
          email: authUser?.email || '',
          created_at: profile.created_at,
          roles: roles
        };
      });

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      throw error;
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

      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUsers = async (userIds: string[]) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userIds[0]); // For now, handle one user at a time
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Deleted user successfully`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting users:', error);
      toast({
        title: "Error",
        description: "Failed to delete users",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUsersRole = async (userIds: string[], role: string) => {
    try {
      const promises = userIds.map(userId => 
        supabase
          .from('user_roles')
          .upsert({ user_id: userId, role: role as 'admin' | 'moderator' | 'user' })
      );
      
      await Promise.all(promises);
      
      toast({
        title: "Success",
        description: `Updated roles for ${userIds.length} users`,
      });
      
      return true;
    } catch (error) {
      console.error('Error updating user roles:', error);
      toast({
        title: "Error",
        description: "Failed to update user roles",
        variant: "destructive",
      });
      return false;
    }
  };

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return {
    users,
    loading: isLoading, // Alias for backward compatibility
    fetchUsers: refetch, // Alias for backward compatibility
    updateUserRole,
    deleteUsers,
    updateUsersRole,
    error
  };
};
