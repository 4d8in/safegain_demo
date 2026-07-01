import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

export const GoalsScreen = () => {
  const { goals, addGoal } = useAppContext();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleAdd = () => {
    if (!name || !target) return;
    addGoal(name, Number(target));
    setName('');
    setTarget('');
  };

  return (
    <ScreenShell title="Savings account" subtitle="Goals and progress">
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Total balance</Text>
          <Text style={styles.amount}>$9,400</Text>
        </View>

        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
          return (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.rowBetween}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalPercent}>{progress}%</Text>
              </View>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View>
              <Text style={styles.goalMeta}>${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}</Text>
              <Text style={styles.goalMeta}>Target date • {goal.deadline}</Text>
            </View>
          );
        })}

        <View style={styles.card}>
          <Text style={styles.label}>Add a goal</Text>
          <TextInput style={styles.input} placeholder="Goal name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Target amount" keyboardType="numeric" value={target} onChangeText={setTarget} />
          <Pressable style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>+ New goal</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, gap: 12, paddingBottom: 32 },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  label: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  amount: { fontSize: 24, fontWeight: '700', color: '#16A34A', marginTop: 6 },
  goalCard: { backgroundColor: '#fff', borderRadius: 22, padding: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalName: { fontWeight: '700', color: '#0F172A' },
  goalPercent: { color: '#16A34A', fontWeight: '700' },
  progressTrack: { height: 10, backgroundColor: '#DCFCE7', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#16A34A' },
  goalMeta: { color: '#64748B', marginTop: 6 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginTop: 8 },
  button: { marginTop: 12, backgroundColor: '#16A34A', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
