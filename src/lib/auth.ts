
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });
export const useAuth = () => useContext(AuthContext);
