const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const beverages = [
  {
    id: "classic",
    name: "Classic Lemonade",
    description: "Fresh-squeezed lemons, cane sugar, and water.",
    sizes: [
      { id: "sm", label: "Small", priceCents: 299 },
      { id: "md", label: "Medium", priceCents: 399 },
      { id: "lg", label: "Large", priceCents: 499 },
    ],
  },
  {
    id: "strawberry",
    name: "Strawberry Lemonade",
    description: "Real strawberries blended with classic lemonade.",
    sizes: [
      { id: "sm", label: "Small", priceCents: 349 },
      { id: "md", label: "Medium", priceCents: 449 },
      { id: "lg", label: "Large", priceCents: 549 },
    ],
  },
  {
    id: "sparkling",
    name: "Sparkling Lemonade",
    description: "A bubbly twist on the original.",
    sizes: [
      { id: "sm", label: "Small", priceCents: 329 },
      { id: "md", label: "Medium", priceCents: 429 },
      { id: "lg", label: "Large", priceCents: 529 },
    ],
  },
  {
    id: "icetea",
    name: "Ice Tea",
    description: "A bubbly ice tea",
    sizes: [
      { id: "sm", label: "Small", priceCents: 429 },
      { id: "md", label: "Medium", priceCents: 529 },
      { id: "lg", label: "Large", priceCents: 629 },
    ],
  },
];

app.get("/", (req, res) =>
  res
    .type("text")
    .send("🍋 Lemonade API is running. Try /beverages (GET) or /orders (POST).")
);
app.get("/beverages", (req, res) => res.json(beverages));
app.post("/orders", (req, res) => {
  const { customer, items } = req.body || {};
  if (
    !customer ||
    !customer.name ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({ message: "Invalid order payload" });
  }
  const orderId = Math.random().toString(36).slice(2, 10);
  setTimeout(() => res.json({ orderId }), 400);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Mock backend http://localhost:${port}`));
