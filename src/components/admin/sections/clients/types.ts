
export type AdminRole = 'admin' | 'moderator' | 'user' | 'master' | 'ceo';

export interface Feature {
  id: string;
  name: string;
  description: string;
  requiredRole: AdminRole;
  tokenCost: number;
}

export interface UserData {
  role: AdminRole;
  tokens: number;
}
