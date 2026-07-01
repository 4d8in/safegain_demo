import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

export const CalculationSettingsScreen = ({ navigation }: { navigation: any }) => {
  const { profitPercent, savingsPercent, setPercentages } = useAppContext();

  return (
    <ScreenShell title="Calculation settings" subtitle="Tune your demo percentages">
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Profit percentage</Text>
          <Text style={styles.value}>{profitPercent}%</Text>
          <Slider minimumValue={5} maximumValue={50} step={1} value={profitPercent} onValueChange={(value) => setPercentages(Number(value), savingsPercent)} />
          <Text style={styles.label}>Savings percentage</Text>
          <Text style={styles.value}>{savingsPercent}%</Text>
          <Slider minimumValue={5} maximumValue={50} step={1} value={savingsPercent} onValueChange={(value) => setPercentages(profitPercent, Number(value))} />
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  label: { fontWeight: '700', color: '#0F172A', marginTop: 10 },
  value: { color: '#16A34A', fontSize: 20, fontWeight: '700', marginBottom: 6 },
  button: { marginTop: 16, backgroundColor: '#16A34A', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
