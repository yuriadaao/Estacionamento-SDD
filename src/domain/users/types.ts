export type UserRole = 'attendance' | 'operation' | 'administration';

export type UserStatus = 'active' | 'inactive';

export interface UserProfile {
  id: string;
  full_name: string;
  birth_date: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
