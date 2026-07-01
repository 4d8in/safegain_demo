import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

export const ProfitScreen = ({ navigation }: { navigation: any }) => {
  const { accounts, profitPercent, savingsPercent, setPercentages } = useAppContext();
  const businessAccount = accounts.find((a) => a.id === 'business');
  const grossProfit = (businessAccount?.balance ?? 0) * (profitPercent / 100);
  const savings = grossProfit * (savingsPercent / 100);
  const netProfit = grossProfit - savings;

  return (
    <ScreenShell title="Profit details" subtitle="Live mock calculations">
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Business account balance</Text>
          <Text style={styles.amount}>${businessAccount?.balance.toLocaleString()}</Text>
          <Text style={styles.row}>Profit %: {profitPercent}%</Text>
          <Text style={styles.row}>Savings %: {savingsPercent}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Automatic calculation</Text>
          <Text style={styles.row}>Gross profit: ${grossProfit.toFixed(0)}</Text>
          <Text style={styles.row}>Savings: ${savings.toFixed(0)}</Text>
          <Text style={styles.row}>Net profit: ${netProfit.toFixed(0)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Adjust your settings</Text>
          <Text style={styles.sliderLabel}>Profit percentage: {profitPercent}%</Text>
          <Slider minimumValue={5} maximumValue={50} step={1} value={profitPercent} onValueChange={(value) => setPercentages(Number(value), savingsPercent)} />
          <Text style={styles.sliderLabel}>Savings percentage: {savingsPercent}%</Text>
          <Slider minimumValue={5} maximumValue={50} step={1} value={savingsPercent} onValueChange={(value) => setPercentages(profitPercent, Number(value))} />
          <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, gap: 14 },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  label: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  amount: { fontSize: 24, fontWeight: '700', color: '#16A34A', marginBottom: 8 },
  row: { color: '#64748B', marginTop: 4 },
  sliderLabel: { color: '#0F172A', marginTop: 8, fontWeight: '600' },
  button: { marginTop: 14, backgroundColor: '#16A34A', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
