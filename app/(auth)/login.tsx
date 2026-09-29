import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/src/features/authentication/AuthProvider';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      setError('Informe e-mail e senha para continuar.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const result = await signIn(email.trim().toLowerCase(), password);
    setIsSubmitting(false);

    if (result) {
      setError(result);
      return;
    }

    router.replace('/dashboard');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.page}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.eyebrow}>GESTÃO DE ESTACIONAMENTO</Text>
          <Text style={styles.title}>Acesse sua conta</Text>
          <Text style={styles.subtitle}>Use suas credenciais para acessar o painel.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="nome@empresa.com"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={email}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="Informe sua senha"
            placeholderTextColor="#6B7280"
            secureTextEntry
            style={styles.input}
            value={password}
          />

          {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}

          <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit} style={({ pressed }) => [styles.button, (pressed || isSubmitting) && styles.buttonPressed]}>
            <Text style={styles.buttonText}>{isSubmitting ? 'Acessando...' : 'Entrar'}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F8F5', justifyContent: 'center' },
  content: { padding: 28, gap: 44 },
  brand: { gap: 10 },
  eyebrow: { color: '#0B6E4F', fontSize: 12, fontWeight: '700', letterSpacing: 1.2 },
  title: { color: '#15251D', fontSize: 32, fontWeight: '700' },
  subtitle: { color: '#526058', fontSize: 16, lineHeight: 23 },
  form: { backgroundColor: '#FFFFFF', borderRadius: 18, elevation: 2, gap: 10, padding: 20, shadowColor: '#15251D', shadowOpacity: 0.08, shadowRadius: 12 },
  label: { color: '#26362D', fontSize: 14, fontWeight: '600', marginTop: 4 },
  input: { backgroundColor: '#F7F9F8', borderColor: '#D7E0DA', borderRadius: 10, borderWidth: 1, color: '#15251D', fontSize: 16, paddingHorizontal: 14, paddingVertical: 13 },
  error: { color: '#B42318', fontSize: 14, lineHeight: 20, marginTop: 4 },
  button: { alignItems: 'center', backgroundColor: '#0B6E4F', borderRadius: 10, marginTop: 14, paddingVertical: 15 },
  buttonPressed: { opacity: 0.75 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
