import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: { height: 68, paddingBottom: 8, paddingTop: 8 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <Home size={20} color={color} /> }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ tabBarIcon: ({ color }) => <ReceiptText size={20} color={color} /> }} />
      <Tab.Screen name="Pay" component={PaymentScreen} options={{ tabBarIcon: ({ color }) => <Send size={20} color={color} /> }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ tabBarIcon: ({ color }) => <Target size={20} color={color} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: ({ color }) => <SettingsIcon size={20} color={color} /> }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isOnboarded, isAuthenticated, completeOnboarding, login } = useAppContext();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name="Profit" component={ProfitScreen} />
      <Stack.Screen name="CalculationSettings" component={CalculationSettingsScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

