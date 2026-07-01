import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, Shield, Bell, Settings2, CreditCard, Languages, LifeBuoy, LogOut } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

const items = [
  { label: 'Profile', icon: <Shield size={18} color="#16A34A" /> },
  { label: 'Security', icon: <Shield size={18} color="#16A34A" /> },
  { label: 'Notifications', icon: <Bell size={18} color="#16A34A" /> },
  { label: 'Calculation settings', icon: <Settings2 size={18} color="#16A34A" /> },
  { label: 'Payment methods', icon: <CreditCard size={18} color="#16A34A" /> },
  { label: 'Language', icon: <Languages size={18} color="#16A34A" /> },
  { label: 'Help & Support', icon: <LifeBuoy size={18} color="#16A34A" /> },
];

export const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { user, logout } = useAppContext();

  return (
    <ScreenShell title="Settings" subtitle="Manage your demo profile">
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {items.map((item) => (
          <Pressable key={item.label} style={styles.item} onPress={() => item.label === 'Calculation settings' ? navigation.navigate('CalculationSettings') : null}>
            <View style={styles.iconBox}>{item.icon}</View>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <ChevronRight size={18} color="#64748B" />
          </Pressable>
        ))}

        <Pressable style={styles.logout} onPress={logout}>
          <LogOut size={18} color="#DC2626" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, gap: 10, paddingBottom: 32 },
  profileCard: { backgroundColor: '#fff', borderRadius: 24, padding: 18 },
  name: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  email: { color: '#64748B', marginTop: 4 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 14 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FDF4', marginRight: 12 },
  itemLabel: { flex: 1, fontWeight: '600', color: '#0F172A' },
  logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', borderRadius: 16, paddingVertical: 14, marginTop: 8, gap: 8 },
  logoutText: { color: '#DC2626', fontWeight: '700' },
});
