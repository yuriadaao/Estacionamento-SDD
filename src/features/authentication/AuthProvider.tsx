import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import type { UserProfile } from '@/src/domain/users/types';
import { getCurrentProfile } from '@/src/services/supabase/profiles';
import { supabase } from '@/src/services/supabase/client';

type AuthContextValue = {
  isLoading: boolean;
  session: Session | null;
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function messageForAuthError(message: string) {
  if (message.toLowerCase().includes('invalid login credentials')) {
    return 'E-mail ou senha inválidos.';
  }

  return 'Não foi possível concluir o acesso. Tente novamente.';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loadSession = useCallback(async (nextSession: Session | null) => {
    if (!nextSession) {
      setSession(null);
      setProfile(null);
      setIsLoading(false);
      return null;
    }

    try {
      const nextProfile = await getCurrentProfile(nextSession.user.id);

      if (nextProfile.status !== 'active') {
        await supabase.auth.signOut();
        setSession(null);
        setProfile(null);
        return 'Seu acesso está inativo. Procure a administração.';
      }

      setSession(nextSession);
      setProfile(nextProfile);
      return null;
    } catch {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      return 'Seu perfil de acesso não foi encontrado.';
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => loadSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, [loadSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      return messageForAuthError(error?.message ?? '');
    }

    return loadSession(data.session);
  }, [loadSession]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const value = useMemo(() => ({ isLoading, session, profile, signIn, signOut }), [isLoading, session, profile, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
