import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store, persistor } from "./src/state/store";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ConfirmationScreen from "./src/screens/ConfirmationScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";

export type RootStackParamList = {
  Home: undefined;
  Checkout: undefined;
  Settings: undefined;
  Confirmation: { orderId: string };
  Orders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Lemonade Stand" }}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: "Checkout" }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }}
              />
              <Stack.Screen
                name="Confirmation"
                component={ConfirmationScreen}
                options={{ title: "Order Confirmation" }}
              />
              <Stack.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ title: "My Orders" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
