
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "moderator" | "user";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          return;
        }

        // First check if the user is an admin from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileError) {
          console.error('Error checking admin status:', profileError);
          toast({
            title: "Error",
            description: "Could not verify admin access",
            variant: "destructive",
          });
          return;
        }

        // Then check user roles from the user_roles table
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (rolesError) {
          console.error('Error checking user roles:', rolesError);
          return;
        }

        // Extract the highest priority role (admin > moderator > user)
        let highestRole: UserRole = "user";
        if (userRoles && userRoles.length > 0) {
          if (userRoles.some(r => r.role === "admin")) {
            highestRole = "admin";
          } else if (userRoles.some(r => r.role === "moderator")) {
            highestRole = "moderator";
          }
        }
        
        setUserRole(highestRole);
        
        // User is considered an admin if they have admin role or is_admin is true
        const hasAdminPrivileges = !!profile?.is_admin || highestRole === "admin" || highestRole === "moderator";
        setIsAdmin(hasAdminPrivileges);
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [toast]);

  return { isAdmin, isLoading, userRole };
};
