import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Apple, BadgeCheck, Mail } from 'lucide-react-native';

export const AuthScreen = ({ mode, onSubmit, onSwitchMode }: { mode: 'login' | 'signup'; onSubmit: () => void; onSwitchMode: () => void }) => {
  const [email, setEmail] = useState('alex@safegain.app');
  const [password, setPassword] = useState('demo1234');
  const [name, setName] = useState('Alex');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.card}>
        <View style={styles.logoBox}>
          <BadgeCheck size={36} color="#16A34A" />
        </View>
        <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
        <Text style={styles.subtitle}>SafeGain demo • no real authentication required</Text>

        {mode === 'signup' ? (
          <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
        ) : null}

        <TextInput style={styles.input} placeholder="Email or phone" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>{mode === 'login' ? 'Log in' : 'Create account'}</Text>
        </Pressable>

        <Text style={styles.or}>or continue with</Text>
        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Mail size={18} color="#0F172A" />
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Apple size={18} color="#0F172A" />
            <Text style={styles.socialText}>Apple</Text>
          </Pressable>
        </View>

        <Pressable onPress={onSwitchMode}>
          <Text style={styles.switchText}>{mode === 'login' ? 'Don’t have an account? Sign up' : 'Already have an account? Log in'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FBF6',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  logoBox: {
    backgroundColor: '#DCFCE7',
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    color: '#64748B',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#16A34A',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  or: {
    color: '#64748B',
    textAlign: 'center',
    marginVertical: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 12,
    gap: 8,
  },
  socialText: {
    color: '#0F172A',
    fontWeight: '600',
  },
  switchText: {
    textAlign: 'center',
    color: '#16A34A',
    fontWeight: '600',
  },
});
