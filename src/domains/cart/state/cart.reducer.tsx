import type { CartItem } from "../types/cart.types";
import type { CartAction } from "./cart-state.types";

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "itemAdded":
      return [...state, action.payload];

    case "itemRemoved":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
}
