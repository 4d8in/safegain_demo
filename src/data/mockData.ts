import type { Account, Goal, Transaction, User } from '../types';

export const initialUser: User = {
  name: 'Alex',
  email: 'alex@safegain.app',
  phone: '+221 77 123 4567',
};

export const initialAccounts: Account[] = [
  {
    id: 'personal',
    name: 'Personal',
    balance: 4850,
    color: '#2E7D32',
    icon: 'wallet',
  },
  {
    id: 'business',
    name: 'Business',
    balance: 18240,
    color: '#0F8A5F',
    icon: 'briefcase',
  },
  {
    id: 'savings',
    name: 'Savings',
    balance: 9400,
    color: '#1B5E20',
    icon: 'piggy-bank',
  },
];

export const initialTransactions: Transaction[] = [
  {
    id: 't1',
    title: 'Client payment',
    amount: 1250,
    type: 'income',
    date: 'Today • 09:24',
    category: 'Business',
    account: 'Business',
  },
  {
    id: 't2',
    title: 'Rent',
    amount: 780,
    type: 'expense',
    date: 'Yesterday • 18:10',
    category: 'Housing',
    account: 'Personal',
  },
  {
    id: 't3',
    title: 'Orange Money transfer',
    amount: 320,
    type: 'income',
    date: 'Jun 28 • 12:45',
    category: 'Refund',
    account: 'Business',
  },
  {
    id: 't4',
    title: 'Savings top-up',
    amount: 650,
    type: 'expense',
    date: 'Jun 25 • 08:20',
    category: 'Auto-save',
    account: 'Savings',
  },
];

export const initialGoals: Goal[] = [
  {
    id: 'g1',
    name: 'Family trip',
    target: 3000,
    current: 1800,
    deadline: 'Sep 2026',
  },
  {
    id: 'g2',
    name: 'Buy a house',
    target: 25000,
    current: 4000,
    deadline: 'Dec 2028',
  },
];
