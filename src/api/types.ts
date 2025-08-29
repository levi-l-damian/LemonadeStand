export type Size = { id: string; label: string; priceCents: number };
export type Beverage = { id: string; name: string; description?: string; sizes: Size[] };
export type OrderItem = { beverageTypeId: string; sizeId: string; quantity: number };
export type Customer = { name: string; email?: string; phone?: string };
export type OrderRequest = { customer: Customer; items: OrderItem[] };
export type OrderResponse = { orderId: string };
