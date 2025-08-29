import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Mode = 'system' | 'light' | 'dark';
type Ctx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  resolved: 'light' | 'dark';
};

const ThemeCtx = createContext<Ctx>({ mode: 'system', setMode: () => {}, resolved: 'light' });
const KEY = 'themeMode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>('system');
  const [system, setSystem] = useState<ColorSchemeName>(Appearance.getColorScheme());

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setSystem(colorScheme));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    (async () => {
      const v = await AsyncStorage.getItem(KEY);
      if (v === 'light' || v === 'dark' || v === 'system') setModeState(v);
    })();
  }, []);

  const setMode = async (m: Mode) => {
    setModeState(m);
    await AsyncStorage.setItem(KEY, m);
  };

  const resolved: 'light' | 'dark' = useMemo(() => {
    if (mode === 'light' || mode === 'dark') return mode;
    return system === 'dark' ? 'dark' : 'light';
  }, [mode, system]) as any;

  return <ThemeCtx.Provider value={{ mode, setMode, resolved }}>{children}</ThemeCtx.Provider>;
}

export const useThemeMode = () => useContext(ThemeCtx);
