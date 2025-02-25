
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
      // First get users from the profiles table
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id');
      
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // Get their roles from the user_roles table
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        throw rolesError;
      }

      // Fetch user details for each profile
      const userPromises = profiles.map(async (profile) => {
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profile.id);
        if (userError) {
          console.error('Error fetching user:', userError);
          return null;
        }
        
        const roles = userRoles
          ?.filter(r => r.user_id === profile.id)
          ?.map(r => r.role as UserRole) || [];

        return {
          id: profile.id,
          email: userData?.user?.email || '',
          created_at: userData?.user?.created_at || '',
          roles: roles
        };
      });

      const users = (await Promise.all(userPromises)).filter((user): user is User => user !== null);
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

      // Then delete from auth.users
      for (const userId of userIds) {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (error) throw error;
      }
      
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
