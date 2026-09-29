import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { canAccessModule, type ModuleKey } from '@/src/domain/authorization/permissions';
import { useAuth } from '@/src/features/authentication/AuthProvider';

const modules: { key: ModuleKey; title: string; description: string; accent: string }[] = [
  { key: 'rotativo', title: 'Rotativo', description: 'Operações de permanência e vagas rotativas.', accent: '#0B6E4F' },
  { key: 'planos_mensais', title: 'Planos Mensais', description: 'Gestão de clientes com plano mensal.', accent: '#2E6E9E' },
  { key: 'administracao', title: 'Administração', description: 'Controle e acompanhamento do sistema.', accent: '#7046A8' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { profile, signOut } = useAuth();

  if (!profile) return null;

  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  function handleModulePress(title: string) {
    Alert.alert(title, 'As funcionalidades deste módulo serão disponibilizadas em uma próxima Spec.');
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>PAINEL DE CONTROLE</Text>
          <Text style={styles.title}>Olá, {profile.full_name.split(' ')[0]}</Text>
          <Text style={styles.subtitle}>Selecione uma área para continuar.</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={handleSignOut} style={styles.logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>

      <View style={styles.cards}>
        {modules.filter((module) => canAccessModule(profile.role, module.key)).map((module) => (
          <Pressable accessibilityRole="button" key={module.key} onPress={() => handleModulePress(module.title)} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
            <View style={[styles.marker, { backgroundColor: module.accent }]} />
            <Text style={styles.cardTitle}>{module.title}</Text>
            <Text style={styles.cardDescription}>{module.description}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#F4F8F5', flexGrow: 1, padding: 24, paddingTop: 58 },
  header: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 34 },
  eyebrow: { color: '#0B6E4F', fontSize: 12, fontWeight: '700', letterSpacing: 1.2, marginBottom: 7 },
  title: { color: '#15251D', fontSize: 29, fontWeight: '700' },
  subtitle: { color: '#526058', fontSize: 15, marginTop: 6 },
  logout: { borderColor: '#B6C5BC', borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  logoutText: { color: '#26362D', fontSize: 14, fontWeight: '600' },
  cards: { gap: 14 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, elevation: 2, minHeight: 142, overflow: 'hidden', padding: 20, shadowColor: '#15251D', shadowOpacity: 0.08, shadowRadius: 10 },
  cardPressed: { opacity: 0.78 },
  marker: { borderRadius: 2, height: 5, marginBottom: 18, width: 42 },
  cardTitle: { color: '#15251D', fontSize: 20, fontWeight: '700', marginBottom: 7 },
  cardDescription: { color: '#526058', fontSize: 14, lineHeight: 20 },
});
