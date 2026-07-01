# SafeGain Demo

SafeGain is a fintech demo app built with React Native and Expo for presentation purposes. The experience uses mocked data and simulated flows to give the illusion of a real, live product without any backend or real financial integration.

## Features

- Onboarding flow with 4 slides
- Mock authentication screens for login and sign-up
- Dashboard with three accounts: Personal, Business, and Savings
- Dynamic profit and savings calculations based on slider settings
- Simulated payment flow with Wave or Orange Money
- Transaction history and savings goals
- Settings and calculation configuration screens

## Tech Stack

- React Native
- Expo
- Expo Router / React Navigation
- TypeScript
- Expo Updates (EAS Update ready)

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the Expo dev server
   ```bash
   npx expo start
   ```
3. Open the app in Expo Go on your phone or emulator.

## EAS Update / Publishing

This project is configured for Expo updates and can be published with EAS Update.

### Install EAS CLI
```bash
npm install -g eas-cli
```

### Login
```bash
npx eas login
```

### Build or publish updates
```bash
npx eas update --branch production --message "Initial SafeGain demo update"
```

## Notes

- All data is static and stored locally in the app state.
- No real database, backend, or payment integration is used.
- The app is intended as a polished MVP demo for showcasing the user experience.
