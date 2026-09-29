import type { UserProfile } from '@/src/domain/users/types';
import { supabase } from './client';

export async function getCurrentProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, birth_date, email, role, status')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error('Não foi possível recuperar o perfil de acesso.');
  }

  return data as UserProfile;
}
