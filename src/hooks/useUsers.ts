import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  roles: UserRole[];
}

type UserRole = "admin" | "moderator" | "user";

export const useUsers = () => {
  const { toast } = useToast();
  
  const fetchUsers = async (): Promise<User[]> => {
    try {
      // Get profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          email:auth.users!id(email),
          created_at:auth.users!id(created_at),
          user_roles(role)
        `);
      
      if (profilesError) {
        throw profilesError;
      }

      // Transform the data into the expected format
      const users = profiles.map(profile => ({
        id: profile.id,
        email: profile.email?.[0]?.email || '',
        created_at: profile.created_at?.[0]?.created_at || '',
        roles: profile.user_roles?.map(r => r.role as UserRole) || []
      }));

      return users;
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please make sure you have admin access.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: role 
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
        description: "Failed to update user role. Please check your permissions.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUsers = async (userIds: string[]) => {
    try {
      // First delete from profiles table
      const { error: profilesError } = await supabase
        .from('profiles')
        .delete()
        .in('id', userIds);

      if (profilesError) throw profilesError;

      toast({
        title: "Success",
        description: `Deleted ${userIds.length} user(s) successfully`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting users:', error);
      toast({
        title: "Error",
        description: "Failed to delete users. Please check your permissions.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUsersRole = async (userIds: string[], role: UserRole) => {
    try {
      const promises = userIds.map(userId => 
        supabase
          .from('user_roles')
          .upsert({ 
            user_id: userId, 
            role: role 
          })
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
        description: "Failed to update user roles. Please check your permissions.",
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