
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  // Add other user fields as needed
}

export const useUsers = () => {
  const { toast } = useToast();
  
  const fetchUsers = async (): Promise<User[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
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

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return {
    users,
    isLoading,
    error
  };
};
