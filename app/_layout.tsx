import { Stack, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';

import { AuthProvider, useAuth } from '@/src/features/authentication/AuthProvider';

function RouteGuard() {
  const { isLoading, session } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const isInAuthGroup = segments[0] === '(auth)';
    if (!session && !isInAuthGroup) router.replace('/login');
    if (session && isInAuthGroup) router.replace('/dashboard');
  }, [isLoading, router, segments, session]);

  if (isLoading) {
    return <View style={styles.loading}><ActivityIndicator size="large" color="#0B6E4F" /></View>;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return <AuthProvider><RouteGuard /></AuthProvider>;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F8F5' },
});
