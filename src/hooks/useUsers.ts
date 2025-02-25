
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
      // First get users with their basic info from auth
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      if (!authUsers?.users?.length) {
        return [];
      }

      // Get their roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Map the data
      const users = authUsers.users.map(authUser => {
        const roles = userRoles
          ?.filter(r => r.user_id === authUser.id)
          ?.map(r => r.role) || [];

        return {
          id: authUser.id,
          email: authUser.email || '',
          created_at: authUser.created_at,
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
    loading: isLoading,
    fetchUsers: refetch,
    updateUserRole,
    deleteUsers,
    updateUsersRole,
    error
  };
};
