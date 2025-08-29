import React from "react";
import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";
import { useAppSelector } from "../state/store";
import { useThemeMode } from "../theme/ThemeProvider";
import { getTokens } from "../theme";
import { formatCents } from "../utils/currency";

export default function OrdersScreen() {
  const orders = useAppSelector((s) => s.orders);
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: t.spacing.md }}>
        <Text
          style={{
            fontSize: t.typography.h1,
            fontWeight: "800",
            color: t.colors.text,
          }}
        >
          My Orders
        </Text>

        {orders.length === 0 ? (
          <Text style={{ color: t.colors.muted }}>No orders placed yet.</Text>
        ) : (
          orders.map((o) => (
            <View
              key={o.orderId + o.createdAt}
              style={{
                borderWidth: 1,
                borderColor: t.colors.border,
                borderRadius: t.radius.lg,
                padding: t.spacing.md,
                gap: 8,
                backgroundColor: t.colors.card,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "800", color: t.colors.text }}>
                  Order #{o.orderId}
                </Text>
                <Text style={{ color: t.colors.muted }}>
                  {new Date(o.createdAt).toLocaleString()}
                </Text>
              </View>

              {o.items.map((it, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: t.colors.text }}>
                    {it.beverageName} ({it.sizeLabel}) ×{it.quantity}
                  </Text>
                  <Text style={{ color: t.colors.text }}>
                    {formatCents(it.totalCents)}
                  </Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
