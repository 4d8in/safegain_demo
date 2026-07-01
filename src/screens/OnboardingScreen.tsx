import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight } from 'lucide-react-native';

const slides = [
  {
    title: 'Welcome to SafeGain',
    subtitle: 'Track your money, grow your profit, and save with confidence.',
    emoji: '💚',
  },
  {
    title: 'Calculate your profit',
    subtitle: 'Your business income is turned into a smart profit plan instantly.',
    emoji: '📈',
  },
  {
    title: 'Save automatically',
    subtitle: 'Set your percentages and let SafeGain move money for you.',
    emoji: '🏦',
  },
  {
    title: 'Secure payments',
    subtitle: 'Send money with Wave or Orange Money in a few taps.',
    emoji: '🔒',
  },
];

export const OnboardingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [index, setIndex] = React.useState(0);
  const slide = slides[index];

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.illustrationBox}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <View style={styles.dots}>
          {slides.map((_, dotIndex) => (
            <View key={dotIndex} style={[styles.dot, dotIndex === index && styles.dotActive]} />
          ))}
        </View>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
          <ArrowRight size={18} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FBF6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  illustrationBox: {
    width: 180,
    height: 180,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 22,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#C7D2FE',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#16A34A',
    width: 28,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 999,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
