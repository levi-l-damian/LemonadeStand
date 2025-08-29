import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
} from "react-native";
import Screen from "../components/Screen";
import { formatCents } from "../utils/currency";
import { submitOrder } from "../api/lemonadeApi";
import type { CustomerForm as CustomerFormType } from "../api/schemas";
import { CustomerSchema } from "../api/schemas";
import type { RootStackParamList } from "../../App";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getTokens } from "../theme";
import { useThemeMode } from "../theme/ThemeProvider";
import { useAppDispatch, useAppSelector } from "../state/store";
import { clear, selectItems, selectTotalCents } from "../state/cartSlice";
import { addOrder } from "../state/ordersSlice";
import type { ZodIssue } from "zod";

type Nav = NativeStackNavigationProp<RootStackParamList>;

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  _contact?: string; // form-level error for "email or phone required"
};

export default function CheckoutScreen() {
  const nav = useNavigation<Nav>();
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotalCents);
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [customer, setCustomer] = useState<CustomerFormType>({
    name: "",
    email: "",
    phone: "",
  });

  const { resolved } = useThemeMode();
  const t = getTokens(resolved);

  const setField = (k: keyof CustomerFormType, v: string) => {
    setCustomer((prev) => ({ ...prev, [k]: v }));
    // clear field-level error as user types
    setErrors((prev) => ({ ...prev, [k]: undefined, _contact: undefined }));
  };

  // Map Zod issues -> field errors (including synthetic _contact)
  function mapIssues(issues: ZodIssue[]) {
    const next: FormErrors = {};
    for (const i of issues) {
      const key = (i.path?.[0] as keyof FormErrors) ?? "_contact";
      next[key] = i.message;
    }
    setErrors(next);
  }

  // Promise that resolves after `ms` with a temp orderId; flagged so we know timeout won
  const timeoutOrder = (ms: number) =>
    new Promise<{ orderId: string; __timedOut: true }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            orderId: "temp-" + Math.random().toString(36).slice(2, 8),
            __timedOut: true,
          }),
        ms
      )
    );

  const placeOrder = async () => {
    // Validate
    const parsed = CustomerSchema.safeParse(customer);
    if (!parsed.success) {
      mapIssues(parsed.error.issues);
      return;
    } else {
      setErrors({});
    }

    if (items.length === 0) {
      Alert.alert("Your cart is empty.");
      return;
    }

    // Build payload once
    const payload = {
      customer: {
        name: customer.name,
        email: customer.email || undefined,
        phone: customer.phone || undefined,
      },
      items: items.map((i) => ({
        beverageTypeId: i.beverageId,
        sizeId: i.sizeId,
        quantity: i.quantity,
      })),
    };

    setSubmitting(true);
    try {
      // Real network call
      const real = submitOrder(payload);

      // Race against a 5s timeout so the UI never feels stuck
      const result = await Promise.race([real, timeoutOrder(5000)]);

      // If timeout won, keep the real call running in background (don't block UI)
      if ((result as any).__timedOut) {
        real.catch(() => {
          /* ignore background failure in dev */
        });
      }

      // Use whichever orderId we have (real or temp)
      const orderId = (result as any).orderId as string;

      // ✅ Record the order locally (won’t block UI)
      dispatch(
        addOrder({
          orderId,
          createdAt: new Date().toISOString(),
          items: items.map((i) => ({
            beverageName: i.beverageName,
            sizeLabel: i.sizeLabel,
            quantity: i.quantity,
            totalCents: i.unitPriceCents * i.quantity,
          })),
        })
      );

      // Clear cart and go to Confirmation (auto-redirect to Home in 5s there)
      dispatch(clear());
      nav.reset({
        index: 0,
        routes: [{ name: "Confirmation", params: { orderId } }],
      });
    } catch (e: any) {
      Alert.alert("Order failed", e?.message ?? "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ gap: t.spacing.sm }}>
        {/* Order Summary */}
        <View
          style={{
            borderWidth: 1,
            borderColor: t.colors.border,
            backgroundColor: t.colors.card,
            borderRadius: t.radius.lg,
            padding: t.spacing.md,
            gap: 6,
          }}
        >
          <Text style={{ fontWeight: "800", color: t.colors.text }}>
            Order Summary
          </Text>
          {items.map((i) => (
            <View
              key={i.key}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: t.colors.text }}>
                {i.beverageName} ({i.sizeLabel}) x{i.quantity}
              </Text>
              <Text style={{ color: t.colors.text }}>
                {formatCents(i.unitPriceCents * i.quantity)}
              </Text>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
              borderTopWidth: 1,
              borderTopColor: t.colors.border,
              paddingTop: 6,
            }}
          >
            <Text style={{ fontWeight: "800", color: t.colors.text }}>
              Total
            </Text>
            <Text style={{ fontWeight: "800", color: t.colors.text }}>
              {formatCents(total)}
            </Text>
          </View>
        </View>

        {/* Customer Form */}
        <View
          style={{
            borderWidth: 1,
            borderColor: t.colors.border,
            backgroundColor: t.colors.card,
            borderRadius: t.radius.lg,
            padding: t.spacing.md,
            gap: 8,
          }}
        >
          <Text style={{ fontWeight: "800", color: t.colors.text }}>
            Customer
          </Text>

          {/* Name */}
          <TextInput
            placeholder="Name"
            placeholderTextColor={t.colors.muted}
            value={customer.name}
            onChangeText={(v) => setField("name", v)}
            style={{
              borderWidth: 1,
              borderColor: errors.name ? t.colors.danger : t.colors.border,
              borderRadius: t.radius.md,
              padding: 12,
              color: t.colors.text,
              backgroundColor: t.colors.surface,
            }}
          />
          {errors.name ? (
            <Text style={{ color: t.colors.danger, marginTop: 4 }}>
              {errors.name}
            </Text>
          ) : null}

          {/* Email */}
          <TextInput
            placeholder="Email (optional)"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={t.colors.muted}
            value={customer.email || ""}
            onChangeText={(v) => setField("email", v)}
            style={{
              borderWidth: 1,
              borderColor: errors.email ? t.colors.danger : t.colors.border,
              borderRadius: t.radius.md,
              padding: 12,
              color: t.colors.text,
              backgroundColor: t.colors.surface,
            }}
          />
          {errors.email ? (
            <Text style={{ color: t.colors.danger, marginTop: 4 }}>
              {errors.email}
            </Text>
          ) : null}

          {/* Phone */}
          <TextInput
            placeholder="Phone (optional)"
            keyboardType="phone-pad"
            placeholderTextColor={t.colors.muted}
            value={customer.phone || ""}
            onChangeText={(v) => setField("phone", v)}
            style={{
              borderWidth: 1,
              borderColor: errors.phone ? t.colors.danger : t.colors.border,
              borderRadius: t.radius.md,
              padding: 12,
              color: t.colors.text,
              backgroundColor: t.colors.surface,
            }}
          />
          {errors.phone ? (
            <Text style={{ color: t.colors.danger, marginTop: 4 }}>
              {errors.phone}
            </Text>
          ) : null}

          {/* Form-level error: requires email OR phone */}
          {errors._contact ? (
            <Text style={{ color: t.colors.danger, marginTop: 8 }}>
              {errors._contact}
            </Text>
          ) : null}
        </View>

        {/* Place Order */}
        <Pressable
          accessibilityRole="button"
          onPress={placeOrder}
          disabled={submitting}
          style={{
            backgroundColor: submitting ? "#94a3b8" : t.colors.primary,
            padding: 14,
            borderRadius: t.radius.lg,
            alignItems: "center",
          }}
        >
          <Text style={{ color: t.colors.primaryText, fontWeight: "800" }}>
            {submitting ? "Placing Order..." : "Place Order"}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
