import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bghjahndsmyckgpvjwci.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnaGphaG5kc215Y2tncHZqd2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MTQwOTAsImV4cCI6MjA1NjQ5MDA5MH0.dSB9C0yeGuG1nPHCzL136pSNqdXxBw0stEEVriz3GJM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});

// Add password reset helper function
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?type=recovery`,
    });
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error };
  }
};