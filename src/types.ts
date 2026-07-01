export type TransactionType = 'income' | 'expense';

export interface Account {
  id: string;
  name: string;
  balance: number;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: string;
  account: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}
