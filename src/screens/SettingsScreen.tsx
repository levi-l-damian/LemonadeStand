import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Screen from '../components/Screen';
import { useThemeMode } from '../theme/ThemeProvider';
import { getTokens } from '../theme';

export default function SettingsScreen() {
  const { mode, setMode, resolved } = useThemeMode();
  const t = getTokens(resolved);

  const Btn = ({ label, value }: { label: string; value: any }) => (
    <Pressable
      onPress={() => setMode(value)}
      style={{ padding: 12, borderRadius: 12, borderWidth: 1, borderColor: t.colors.border, backgroundColor: mode === value ? t.colors.primary : t.colors.card, marginBottom: 8 }}
    >
      <Text style={{ color: mode === value ? t.colors.primaryText : t.colors.text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <Text style={{ color: t.colors.text, fontSize: t.typography.h1, fontWeight: '800' }}>Theme</Text>
        <Btn label="System" value="system" />
        <Btn label="Light" value="light" />
        <Btn label="Dark" value="dark" />
        <Text style={{ color: t.colors.muted }}>Current resolved: {resolved}</Text>
      </View>
    </Screen>
  );
}
