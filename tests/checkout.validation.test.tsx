import React from "react";
import { render, fireEvent, screen } from "./test-utils";
import CheckoutScreen from "../src/screens/CheckoutScreen";

test("requires name and either email or phone", async () => {
  render(<CheckoutScreen />);

  // Try placing order with defaults (no name/contact)
  const placeBtn = await screen.findByText(/Place Order/i);
  fireEvent.press(placeBtn);

  // Inline errors should appear
  expect(await screen.findByText(/Please enter your name/i)).toBeTruthy();
  expect(
    await screen.findByText(/Provide at least one contact method/i)
  ).toBeTruthy();
});
