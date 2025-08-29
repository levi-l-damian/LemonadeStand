import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import Screen from "../components/Screen";
import type { RootStackParamList } from "../../App";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getTokens } from "../theme";
import { useThemeMode } from "../theme/ThemeProvider";

type Props = NativeStackScreenProps<RootStackParamList, "Confirmation">;

export default function ConfirmationScreen({ route, navigation }: Props) {
  const { orderId } = route.params;
  const { resolved } = useThemeMode();
  const t = getTokens(resolved);

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: t.typography.h1,
            fontWeight: "800",
            color: t.colors.text,
          }}
        >
          Thanks for your order!
        </Text>
        <Text style={{ color: t.colors.text }}>
          Your confirmation number is:
        </Text>
        <Text
          style={{
            fontSize: t.typography.h2,
            fontWeight: "700",
            color: t.colors.text,
          }}
        >
          {orderId}
        </Text>

        {/* Continue Shopping button */}
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
          style={{
            marginTop: 24,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: t.radius.lg,
            backgroundColor: t.colors.primary,
          }}
        >
          <Text style={{ color: t.colors.primaryText, fontWeight: "800" }}>
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}
