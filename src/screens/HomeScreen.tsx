import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, Landmark, PiggyBank, Wallet } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { user, accounts, profitPercent, savingsPercent } = useAppContext();

  const businessAccount = accounts.find((a) => a.id === 'business');
  const personalAccount = accounts.find((a) => a.id === 'personal');
  const savingsAccount = accounts.find((a) => a.id === 'savings');
  const grossProfit = (businessAccount?.balance ?? 0) * (profitPercent / 100);
  const savings = grossProfit * (savingsPercent / 100);
  const netProfit = grossProfit - savings;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScreenShell title={`Hello, ${user.name}`} subtitle="Your money is working smarter.">
        <></>
      </ScreenShell>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Monthly profit</Text>
          <Text style={styles.heroAmount}>${netProfit.toFixed(0)}</Text>
          <Text style={styles.heroHint}>Based on your current settings • {profitPercent}% profit • {savingsPercent}% savings</Text>
        </View>

        <View style={styles.grid}>
          {accounts.map((account) => (
            <Pressable key={account.id} style={styles.accountCard} onPress={() => navigation.navigate(account.id === 'savings' ? 'Goals' : 'Profit')}>
              <View style={[styles.iconBox, { backgroundColor: `${account.color}20` }]}> 
                {account.id === 'personal' ? <Wallet size={20} color={account.color} /> : account.id === 'business' ? <Landmark size={20} color={account.color} /> : <PiggyBank size={20} color={account.color} />}
              </View>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountBalance}>${account.balance.toLocaleString()}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Profit overview</Text>
            <Pressable onPress={() => navigation.navigate('Profit')}>
              <ArrowUpRight size={18} color="#16A34A" />
            </Pressable>
          </View>
          <Text style={styles.muted}>Gross profit: ${grossProfit.toFixed(0)}</Text>
          <Text style={styles.muted}>Savings moved: ${savings.toFixed(0)}</Text>
          <Text style={styles.muted}>Net profit: ${netProfit.toFixed(0)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5FBF6' },
  content: { padding: 20, paddingBottom: 36 },
  heroCard: { backgroundColor: '#16A34A', borderRadius: 24, padding: 20, marginBottom: 16 },
  heroLabel: { color: '#DCFCE7', fontWeight: '600' },
  heroAmount: { color: '#fff', fontSize: 32, fontWeight: '700', marginVertical: 6 },
  heroHint: { color: '#ECFCCB', fontSize: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  accountCard: { width: '48%', backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  accountName: { fontWeight: '700', color: '#0F172A' },
  accountBalance: { marginTop: 4, color: '#16A34A', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontWeight: '700', color: '#0F172A' },
  muted: { color: '#64748B', marginTop: 4 },
});
