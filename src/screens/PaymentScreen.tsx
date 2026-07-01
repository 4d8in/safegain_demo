import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

const steps = ['Amount', 'Method', 'Confirm', 'Phone', 'Success'];

export const PaymentScreen = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('250');
  const [reason, setReason] = useState('Client invoice');
  const [method, setMethod] = useState<'Wave' | 'Orange Money'>('Wave');
  const { payAmount } = useAppContext();

  const handleNext = () => {
    if (step === 3) {
      payAmount(Number(amount), reason, method);
      setStep(4);
      return;
    }
    setStep((current) => current + 1);
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <View style={styles.card}>
          <Text style={styles.label}>Enter amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          <Text style={styles.label}>Reason</Text>
          <TextInput style={styles.input} value={reason} onChangeText={setReason} />
          <Pressable style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Continue</Text></Pressable>
        </View>
      );
    }
    if (step === 1) {
      return (
        <View style={styles.card}>
          <Text style={styles.label}>Choose payment method</Text>
          <Pressable style={[styles.methodCard, method === 'Wave' && styles.methodActive]} onPress={() => setMethod('Wave')}>
            <Text style={styles.methodTitle}>Wave</Text>
            <Text style={styles.methodHint}>Fast mobile transfer</Text>
          </Pressable>
          <Pressable style={[styles.methodCard, method === 'Orange Money' && styles.methodActive]} onPress={() => setMethod('Orange Money')}>
            <Text style={styles.methodTitle}>Orange Money</Text>
            <Text style={styles.methodHint}>Available in Francophone regions</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Continue</Text></Pressable>
        </View>
      );
    }
    if (step === 2) {
      return (
        <View style={styles.card}>
          <Text style={styles.label}>Confirmation</Text>
          <Text style={styles.row}>Amount: ${amount}</Text>
          <Text style={styles.row}>Reason: {reason}</Text>
          <Text style={styles.row}>Method: {method}</Text>
          <Pressable style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Confirm</Text></Pressable>
        </View>
      );
    }
    if (step === 3) {
      return (
        <View style={styles.card}>
          <Text style={styles.label}>Confirm on your phone</Text>
          <ActivityIndicator size="large" color="#16A34A" />
          <Text style={styles.row}>A secure approval request was sent to your device.</Text>
          <Pressable style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Continue</Text></Pressable>
        </View>
      );
    }
    return (
      <View style={styles.card}>
        <Text style={styles.successTitle}>Payment successful!</Text>
        <Text style={styles.row}>Your transfer is complete and the simulated ledger has been updated.</Text>
      </View>
    );
  };

  return (
    <ScreenShell title="Pay" subtitle="Simulated payment flow">
      <View style={styles.content}>
        <View style={styles.stepRow}>
          {steps.map((label, index) => (
            <View key={label} style={[styles.stepBubble, index <= step && styles.stepBubbleActive]}>
              <Text style={[styles.stepText, index <= step && styles.stepTextActive]}>{index + 1}</Text>
            </View>
          ))}
        </View>
        {renderStep()}
      </View>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, gap: 16 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stepBubble: { width: 34, height: 34, borderRadius: 999, backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  stepBubbleActive: { backgroundColor: '#16A34A' },
  stepText: { color: '#64748B', fontWeight: '700' },
  stepTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  label: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  button: { marginTop: 10, backgroundColor: '#16A34A', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  methodCard: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 16, padding: 14, marginBottom: 10 },
  methodActive: { borderColor: '#16A34A', backgroundColor: '#F0FDF4' },
  methodTitle: { fontWeight: '700', color: '#0F172A' },
  methodHint: { color: '#64748B', marginTop: 4 },
  row: { color: '#64748B', marginTop: 6 },
  successTitle: { fontSize: 22, fontWeight: '700', color: '#16A34A' },
});
