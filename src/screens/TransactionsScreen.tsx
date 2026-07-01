import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ArrowDownLeft, ArrowUpRight, BadgeDollarSign, Landmark } from 'lucide-react-native';
import { useAppContext } from '../context/AppContext';
import { ScreenShell } from '../components/ScreenShell';

const filters = ['All', 'Income', 'Expense'];

export const TransactionsScreen = () => {
  const { transactions } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return transactions;
    return transactions.filter((item) => item.type === (activeFilter === 'Income' ? 'income' : 'expense'));
  }, [activeFilter, transactions]);

  return (
    <ScreenShell title="Transactions" subtitle="Filtered history">
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <Pressable key={filter} style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]} onPress={() => setActiveFilter(filter)}>
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map((transaction) => (
          <View key={transaction.id} style={styles.item}>
            <View style={styles.iconBox}>{transaction.type === 'income' ? <ArrowDownLeft size={18} color="#16A34A" /> : <ArrowUpRight size={18} color="#DC2626" />}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{transaction.title}</Text>
              <Text style={styles.subtitle}>{transaction.date} • {transaction.category}</Text>
            </View>
            <Text style={[styles.amount, transaction.type === 'income' ? styles.income : styles.expense]}>{transaction.type === 'income' ? '+' : '-'}${transaction.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginBottom: 10 },
  filterChip: { backgroundColor: '#ECFDF5', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  filterChipActive: { backgroundColor: '#16A34A' },
  filterText: { color: '#166534', fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  list: { padding: 20, paddingTop: 8, gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, padding: 14 },
  iconBox: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontWeight: '700', color: '#0F172A' },
  subtitle: { color: '#64748B', marginTop: 3 },
  amount: { fontWeight: '700' },
  income: { color: '#16A34A' },
  expense: { color: '#DC2626' },
});
