import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PastOrderItem = {
  beverageName: string;
  sizeLabel: string;
  quantity: number;
  totalCents: number;
};

export type PastOrder = {
  orderId: string;
  createdAt: string;          // ISO string
  items: PastOrderItem[];
};

const initialState: PastOrder[] = [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, { payload }: PayloadAction<PastOrder>) => {
      state.unshift(payload); // newest first
    },
    clearOrders: () => initialState,
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
