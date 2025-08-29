import { DefaultTheme, Theme } from '@react-navigation/native';
import { darkTokens, lightTokens, Tokens } from './tokens';

export type ResolvedTheme = 'light' | 'dark';

export function getTokens(mode: ResolvedTheme): Tokens {
  return mode === 'dark' ? darkTokens : lightTokens;
}

export function getNavTheme(mode: ResolvedTheme): Theme {
  const t = getTokens(mode);
  return {
    ...DefaultTheme,
    dark: mode === 'dark',
    colors: {
      ...DefaultTheme.colors,
      background: t.colors.background,
      card: t.colors.surface,
      border: t.colors.border,
      text: t.colors.text,
      primary: t.colors.primary,
      notification: t.colors.primary
    }
  };
}

export * from './tokens';
