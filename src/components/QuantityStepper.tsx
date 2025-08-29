import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useThemeMode } from '../theme/ThemeProvider';
import { getTokens } from '../theme';

type Props = { value: number; onChange: (val: number) => void; };

export default function QuantityStepper({ value, onChange }: Props) {
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);
  const s = styles(t);
  return (
    <View style={s.row}>
      <Pressable accessibilityRole="button" style={s.btn} onPress={() => onChange(Math.max(1, value - 1))}>
        <Text style={s.btnText}>-</Text>
      </Pressable>
      <Text style={s.qty}>{value}</Text>
      <Pressable accessibilityRole="button" style={s.btn} onPress={() => onChange(value + 1)}>
        <Text style={s.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = (t: any) => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: t.spacing.sm },
  btn: { paddingHorizontal: t.spacing.md, paddingVertical: t.spacing.xs, borderRadius: t.radius.md, borderWidth: 1, borderColor: t.colors.border, backgroundColor: t.colors.card },
  btnText: { fontSize: t.typography.h2, fontWeight: '700', color: t.colors.text },
  qty: { minWidth: 28, textAlign: 'center', fontSize: t.typography.h2, color: t.colors.text }
});
