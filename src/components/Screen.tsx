import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeMode } from '../theme/ThemeProvider';
import { getTokens } from '../theme';

export default function Screen({ children }: { children: React.ReactNode }) {
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);
  const s = styles(t);
  return <View style={s.container}>{children}</View>;
}

const styles = (t: any) => StyleSheet.create({
  container: { flex: 1, padding: t.spacing.md, gap: t.spacing.sm, backgroundColor: t.colors.background }
});
