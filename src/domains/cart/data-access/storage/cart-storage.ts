import type { CartItem } from "../../types/cart.types";

const CART_STORAGE_KEY = "cart";

export function loadCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  return JSON.parse(storedCart) as CartItem[];
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}
