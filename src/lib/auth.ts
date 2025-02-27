
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  isLoading: true,
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);
