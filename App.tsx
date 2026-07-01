import React, { useState } from 'react';
import { View } from 'react-native';
import { Home, ReceiptText, Send, Target, Settings as SettingsIcon } from 'lucide-react-native';
import { AppProvider, useAppContext } from './src/context/AppContext';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TransactionsScreen } from './src/screens/TransactionsScreen';
import { PaymentScreen } from './src/screens/PaymentScreen';
import { GoalsScreen } from './src/screens/GoalsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ProfitScreen } from './src/screens/ProfitScreen';
import { CalculationSettingsScreen } from './src/screens/CalculationSettingsScreen';

type ScreenName = 'home' | 'transactions' | 'pay' | 'goals' | 'settings' | 'profit' | 'calculationSettings';

const AppNavigator = () => {
  const { isOnboarded, isAuthenticated, completeOnboarding, login } = useAppContext();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');

  if (!isOnboarded) {
    return <OnboardingScreen onFinish={completeOnboarding} />;
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        mode={authMode}
        onSubmit={login}
        onSwitchMode={() => setAuthMode((mode) => (mode === 'login' ? 'signup' : 'login'))}
      />
    );
  }

  const renderScreen = () => {
    const navigation = { navigate: setCurrentScreen };
    switch (currentScreen) {
      case 'home':
        return <HomeScreen navigation={navigation} />;
      case 'transactions':
        return <TransactionsScreen />;
      case 'pay':
        return <PaymentScreen />;
      case 'goals':
        return <GoalsScreen />;
      case 'settings':
        return <SettingsScreen navigation={navigation} />;
      case 'profit':
        return <ProfitScreen navigation={navigation} />;
      case 'calculationSettings':
        return <CalculationSettingsScreen navigation={navigation} />;
      default:
        return <HomeScreen navigation={navigation} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <View style={{ flexDirection: 'row', height: 68, paddingTop: 8, paddingBottom: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0', backgroundColor: '#fff' }}>
        {[
          { id: 'home', Icon: Home, label: 'Home' },
          { id: 'transactions', Icon: ReceiptText, label: 'Transactions' },
          { id: 'pay', Icon: Send, label: 'Pay' },
          { id: 'goals', Icon: Target, label: 'Goals' },
          { id: 'settings', Icon: SettingsIcon, label: 'Settings' },
        ].map(({ id, Icon }) => (
          <View key={id} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={24} color={currentScreen === id ? '#16A34A' : '#64748B'} onPress={() => setCurrentScreen(id as ScreenName)} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

