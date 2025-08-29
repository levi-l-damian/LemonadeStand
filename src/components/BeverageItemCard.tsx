import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Beverage, Size } from '../api/types';
import QuantityStepper from './QuantityStepper';
import { useAppDispatch } from '../state/store';
import { addItem } from '../state/cartSlice';
import { useThemeMode } from '../theme/ThemeProvider';
import { getTokens } from '../theme';

type Props = { beverage: Beverage };

export default function BeverageItemCard({ beverage }: Props) {
  const [selectedSize, setSelectedSize] = useState<Size>(beverage.sizes[0]);
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);
  const s = styles(t);

  return (
    <View style={s.card}>
      <Text style={s.title}>{beverage.name}</Text>
      {beverage.description ? <Text style={s.desc}>{beverage.description}</Text> : null}
      <View style={s.sizes}>
        {beverage.sizes.map((sze) => (
          <Pressable
            key={sze.id}
            onPress={() => setSelectedSize(sze)}
            style={[s.size, selectedSize.id === sze.id && s.sizeActive]}
            accessibilityRole="button"
          >
            <Text style={s.sizeText}>{sze.label}</Text>
            <Text style={s.sizePrice}>${(sze.priceCents / 100).toFixed(2)}</Text>
          </Pressable>
        ))}
      </View>
      <View style={s.footer}>
        <QuantityStepper value={qty} onChange={setQty} />
        <Pressable
          onPress={() => dispatch(addItem({
            beverageId: beverage.id,
            beverageName: beverage.name,
            sizeId: selectedSize.id,
            sizeLabel: selectedSize.label,
            unitPriceCents: selectedSize.priceCents,
            quantity: qty
          }))}
          style={s.addBtn}
          accessibilityRole="button"
        >
          <Text style={s.addText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = (t: any) => StyleSheet.create({
  card: { borderWidth: 1, borderColor: t.colors.border, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, gap: t.spacing.xs },
  title: { fontSize: t.typography.h2, fontWeight: '800', color: t.colors.text },
  desc: { color: t.colors.muted },
  sizes: { flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm },
  size: { paddingHorizontal: t.spacing.sm, paddingVertical: 6, borderWidth: 1, borderColor: t.colors.border, borderRadius: 9999, backgroundColor: t.colors.surface },
  sizeActive: { backgroundColor: t.colors.primary, borderColor: t.colors.primary },
  sizeText: { fontWeight: '700', color: t.colors.text },
  sizePrice: { color: t.colors.text },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: t.spacing.xs },
  addBtn: { backgroundColor: t.colors.primary, paddingHorizontal: t.spacing.lg, paddingVertical: t.spacing.sm, borderRadius: t.radius.md },
  addText: { color: t.colors.primaryText, fontWeight: '800' }
});
