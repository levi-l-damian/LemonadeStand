// tests/test-utils.tsx
import React, { PropsWithChildren } from "react";
import { render as rtlRender } from "@testing-library/react-native";
import * as rtl from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../src/state/cartSlice";
import ordersReducer from "../src/state/ordersSlice";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Minimal navigator with app routes so navigation works in tests
const Stack = createNativeStackNavigator();

function TestNavigator({ children }: PropsWithChildren) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="__TEST__">
        <Stack.Screen name="__TEST__" component={() => <>{children}</>} />
        <Stack.Screen name="Home" component={() => null} />
        <Stack.Screen name="Checkout" component={() => null} />
        <Stack.Screen name="Settings" component={() => null} />
        <Stack.Screen name="Confirmation" component={() => null} />
        <Stack.Screen name="Orders" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function createTestStore(preloadedState?: any) {
  const reducer = combineReducers({ cart: cartReducer, orders: ordersReducer });
  return configureStore({ reducer, preloadedState });
}

export function render(
  ui: React.ReactElement,
  { preloadedState }: { preloadedState?: any } = {}
) {
  const store = createTestStore(preloadedState);
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <TestNavigator>{children}</TestNavigator>
        </ThemeProvider>
      </Provider>
    );
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper }) };
}

// Re-export RTL helpers
export * from "@testing-library/react-native";
