import React from "react";
import { render, screen } from "./test-utils";
import * as api from "../src/api/lemonadeApi";
import HomeScreen from "../src/screens/HomeScreen";

jest.spyOn(api, "fetchBeverages").mockResolvedValue([
  {
    id: "classic",
    name: "Classic Lemonade",
    sizes: [{ id: "sm", label: "Small", priceCents: 200 }],
  },
  {
    id: "pink",
    name: "Pink Lemonade",
    sizes: [{ id: "md", label: "Medium", priceCents: 350 }],
  },
]);

test("shows beverages from API", async () => {
  render(<HomeScreen />);
  expect(await screen.findByText(/Classic Lemonade/i)).toBeTruthy();
  expect(await screen.findByText(/Pink Lemonade/i)).toBeTruthy();
});
