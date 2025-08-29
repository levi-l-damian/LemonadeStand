import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCents } from '../utils/currency';
import { useAppSelector } from '../state/store';
import { selectItems, selectTotalCents } from '../state/cartSlice';
import { useThemeMode } from '../theme/ThemeProvider';
import { getTokens } from '../theme';

export default function CartSummary() {
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);
  const s = styles(t);
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotalCents);
  return (
    <View style={s.card}>
      <Text style={s.title}>Cart</Text>
      {items.length === 0 ? (
        <Text style={{ color: t.colors.muted }}>Your cart is empty.</Text>
      ) : (
        <View style={{ gap: 6 }}>
          {items.map((i) => (
            <View key={i.key} style={s.row}>
              <Text style={{ flex: 1, color: t.colors.text }}>{i.beverageName} ({i.sizeLabel}) x{i.quantity}</Text>
              <Text style={{ color: t.colors.text }}>{formatCents(i.unitPriceCents * i.quantity)}</Text>
            </View>
          ))}
          <View style={[s.row, s.totalRow]}>
            <Text style={{ fontWeight: '800', color: t.colors.text }}>Total</Text>
            <Text style={{ fontWeight: '800', color: t.colors.text }}>{formatCents(total)}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = (t: any) => StyleSheet.create({
  card: { borderWidth: 1, borderColor: t.colors.border, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, gap: t.spacing.xs },
  title: { fontSize: t.typography.h2, fontWeight: '800', color: t.colors.text },
  row: { flexDirection: 'row', alignItems: 'center' },
  totalRow: { borderTopWidth: 1, borderTopColor: t.colors.border, paddingTop: 6, marginTop: 6 }
});
