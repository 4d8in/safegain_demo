import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialAccounts, initialGoals, initialTransactions, initialUser } from '../data/mockData';
import type { Account, Goal, Transaction, User } from '../types';

type AppContextValue = {
  user: User;
  accounts: Account[];
  transactions: Transaction[];
  goals: Goal[];
  profitPercent: number;
  savingsPercent: number;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  completeOnboarding: () => void;
  login: () => void;
  logout: () => void;
  setPercentages: (profit: number, savings: number) => void;
  addGoal: (name: string, target: number) => void;
  payAmount: (amount: number, reason: string, method: string) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState(initialUser);
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [profitPercent, setProfitPercent] = useState(18);
  const [savingsPercent, setSavingsPercent] = useState(12);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const completeOnboarding = () => setIsOnboarded(true);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const setPercentages = (profit: number, savings: number) => {
    setProfitPercent(profit);
    setSavingsPercent(savings);
  };

  const addGoal = (name: string, target: number) => {
    setGoals((current) => [
      ...current,
      {
        id: `goal-${Date.now()}`,
        name,
        target,
        current: 0,
        deadline: 'Q4 2026',
      },
    ]);
  };

  const payAmount = (amount: number, reason: string, method: string) => {
    setAccounts((current) =>
      current.map((account) =>
        account.id === 'business'
          ? { ...account, balance: Number((account.balance - amount).toFixed(2)) }
          : account
      )
    );
    setTransactions((current) => [
      {
        id: `tx-${Date.now()}`,
        title: `${reason} • ${method}`,
        amount,
        type: 'expense',
        date: 'Just now',
        category: 'Transfer',
        account: 'Business',
      },
      ...current,
    ]);
  };

  const value = useMemo(
    () => ({
      user,
      accounts,
      transactions,
      goals,
      profitPercent,
      savingsPercent,
      isOnboarded,
      isAuthenticated,
      completeOnboarding,
      login,
      logout,
      setPercentages,
      addGoal,
      payAmount,
    }),
    [accounts, goals, isAuthenticated, isOnboarded, profitPercent, savingsPercent, transactions, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
