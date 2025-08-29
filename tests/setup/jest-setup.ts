// tests/setup/jest-setup.ts
import '@testing-library/jest-native/extend-expect';

// --- keep your RNGH conditional require ---
try {
  require('react-native-gesture-handler/jestSetup');
} catch { /* noop */ }

// AsyncStorage: provide a pure JS mock in Jest
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// redux-persist: no side effects in tests
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: (_cfg: any, baseReducer: any) => baseReducer,
    persistStore: () => ({ purge: jest.fn(), flush: jest.fn(), pause: jest.fn(), persist: jest.fn() }),
  };
});


// --- keep your Reanimated mock (fully inline in factory) ---
try {
  require('react-native-reanimated');
  jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    if (Reanimated?.default && typeof Reanimated.default.call !== 'function') {
      Reanimated.default.call = () => { };
    }
    return { ...Reanimated, default: Reanimated };
  });
} catch { /* reanimated not installed — skip */ }

// Quiet RN Animated warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
