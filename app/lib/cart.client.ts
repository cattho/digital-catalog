import { readJsonFromStorage, writeJsonToStorage } from "~/lib/storage.client";
import type { CartItem } from "~/types/catalog";

const CART_KEY = "catalog_cart_v1";

type CartPayload = {
  items: CartItem[];
};

export function readCart(): CartItem[] {
  const payload = readJsonFromStorage<CartPayload>(CART_KEY, { items: [] });
  return payload.items;
}

export function writeCart(items: CartItem[]) {
  writeJsonToStorage<CartPayload>(CART_KEY, { items });
}

export function addToCart(items: CartItem[], productId: string): CartItem[] {
  const existing = items.find((i) => i.productId === productId);
  if (!existing) return [...items, { productId, quantity: 1 }];
  return items.map((i) =>
    i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
  );
}

export function removeFromCart(items: CartItem[], productId: string): CartItem[] {
  const existing = items.find((i) => i.productId === productId);
  if (!existing) return items;
  if (existing.quantity <= 1) return items.filter((i) => i.productId !== productId);
  return items.map((i) =>
    i.productId === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i,
  );
}

export function clearCart(): CartItem[] {
  return [];
}
