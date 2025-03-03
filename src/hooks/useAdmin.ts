import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Add both CEO emails
const CEO_EMAILS = ["patricknieborg@me.com", "infoappsnl@gmail.com"];

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isCEO, setIsCEO] = useState(false);
  const [isProAdmin, setIsProAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setIsCEO(false);
          setIsProAdmin(false);
          setIsLoading(false);
          return;
        }

        // Check if user is a CEO
        const isCEOEmail = CEO_EMAILS.includes(user.email || '');
        setIsCEO(isCEOEmail);
        
        // First check if user has admin flag in profiles
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
          setIsLoading(false);
          return;
        }
        
        // Then check for specific roles in user_roles table
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);
          
        if (rolesError) {
          console.error('Error checking user roles:', rolesError);
          setIsLoading(false);
          return;
        }
        
        const roles = userRoles?.map(r => r.role) || [];
        
        // Check subscription status for Pro admin
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('level')
          .eq('profile_id', user.id)
          .single();

        const isProSubscriber = subscription?.level === 'enhanced';
        
        // Set admin status based on hierarchy
        const hasAdminRole = roles.includes('admin');
        
        setIsAdmin(!!profile?.is_admin || hasAdminRole || isCEOEmail);
        setIsSuperAdmin(isCEOEmail);
        setIsProAdmin(isProSubscriber && hasAdminRole);
        
        // If user is CEO but doesn't have admin role yet, add it
        if (isCEOEmail && !hasAdminRole) {
          await supabase
            .from('user_roles')
            .upsert({ user_id: user.id, role: 'admin' });
            
          // Also ensure CEO has admin flag in profiles
          if (!profile?.is_admin) {
            await supabase
              .from('profiles')
              .update({ is_admin: true })
              .eq('id', user.id);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setIsCEO(false);
        setIsProAdmin(false);
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [toast]);

  return { isAdmin, isSuperAdmin, isCEO, isProAdmin, isLoading };
};