import React from "react";
import { render, fireEvent, screen } from "./test-utils";
import HomeScreen from "../src/screens/HomeScreen";
import CheckoutScreen from "../src/screens/CheckoutScreen";
import * as api from "../src/api/lemonadeApi";

jest
  .spyOn(api, "fetchBeverages")
  .mockResolvedValue([
    {
      id: "classic",
      name: "Classic Lemonade",
      sizes: [{ id: "sm", label: "Small", priceCents: 200 }],
    },
  ]);
jest.spyOn(api, "submitOrder").mockResolvedValue({ orderId: "TEST123" });

test("user can add item and place order", async () => {
  render(<HomeScreen />);
  expect(await screen.findByText(/Classic Lemonade/i)).toBeTruthy();

  const addBtn = await screen.findByRole("button", { name: /add/i });
  fireEvent.press(addBtn);

  const checkoutBtn = await screen.findByText(/checkout/i);
  fireEvent.press(checkoutBtn);

  render(<CheckoutScreen />);
  fireEvent.changeText(
    await screen.findByPlaceholderText(/name/i),
    "Test User"
  );
  fireEvent.changeText(
    await screen.findByPlaceholderText(/email/i),
    "test@example.com"
  );

  fireEvent.press(await screen.findByText(/place order/i));
});
