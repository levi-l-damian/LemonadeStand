import React from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import Screen from "../components/Screen";
import BeverageItemCard from "../components/BeverageItemCard";
import CartSummary from "../components/CartSummary";
import { useBeverages } from "../hooks/useBeverages";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import { getTokens } from "../theme";
import { useThemeMode } from "../theme/ThemeProvider";

type Nav = NativeStackNavigationProp<RootStackParamList>;
export default function HomeScreen() {
  const nav = useNavigation<Nav>();
  const { data, loading, error, reload } = useBeverages();
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        contentContainerStyle={{ gap: t.spacing.sm }}
      >
        {error ? (
          <View
            style={{
              padding: t.spacing.sm,
              borderWidth: 1,
              borderColor: t.colors.danger,
              backgroundColor: t.colors.surface,
              borderRadius: t.radius.lg,
            }}
          >
            <Text style={{ color: t.colors.danger }}>{error}</Text>
          </View>
        ) : null}
        {data?.map((bev) => (
          <BeverageItemCard key={bev.id} beverage={bev} />
        ))}
        <CartSummary />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => nav.navigate("Checkout")}
            style={{
              flex: 1,
              backgroundColor: t.colors.primary,
              padding: 14,
              borderRadius: t.radius.lg,
              alignItems: "center",
            }}
          >
            <Text style={{ color: t.colors.primaryText, fontWeight: "800" }}>
              Checkout
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => nav.navigate("Settings")}
            style={{
              padding: 14,
              borderRadius: t.radius.lg,
              alignItems: "center",
              borderWidth: 1,
              borderColor: t.colors.border,
              backgroundColor: t.colors.card,
            }}
          >
            <Text style={{ color: t.colors.text, fontWeight: "800" }}>
              Theme
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => nav.navigate("Orders")}
            style={{
              marginTop: 10,
              backgroundColor: t.colors.card,
              padding: 14,
              borderRadius: t.radius.lg,
              borderWidth: 1,
              borderColor: t.colors.border,
              alignItems: "center",
            }}
          >
            <Text style={{ color: t.colors.text, fontWeight: "800" }}>
              My Orders
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
