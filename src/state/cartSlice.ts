import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export type CartItem = {
  key: string;
  beverageId: string;
  beverageName: string;
  sizeId: string;
  sizeLabel: string;
  unitPriceCents: number;
  quantity: number;
};

export type CartState = { items: CartItem[] };
const initialState: CartState = { items: [] };

type AddPayload = {
  beverageId: string;
  beverageName: string;
  sizeId: string;
  sizeLabel: string;
  unitPriceCents: number;
  quantity?: number;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<AddPayload>) => {
      const key = `${payload.beverageId}|${payload.sizeId}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        existing.quantity += payload.quantity ?? 1;
      } else {
        state.items.push({
          key,
          beverageId: payload.beverageId,
          beverageName: payload.beverageName,
          sizeId: payload.sizeId,
          sizeLabel: payload.sizeLabel,
          unitPriceCents: payload.unitPriceCents,
          quantity: payload.quantity ?? 1,
        });
      }
    },
    updateQuantity: (state, { payload }: PayloadAction<{ key: string; quantity: number }>) => {
      const item = state.items.find((i) => i.key === payload.key);
      if (item) item.quantity = payload.quantity;
    },
    removeItem: (state, { payload }: PayloadAction<{ key: string }>) => {
      state.items = state.items.filter((i) => i.key !== payload.key);
    },
    clear: (state) => { state.items = []; }
  }
});

export const { addItem, updateQuantity, removeItem, clear } = cartSlice.actions;
export default cartSlice.reducer;

export const selectItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalCents = createSelector(selectItems, (items) =>
  items.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0)
);
