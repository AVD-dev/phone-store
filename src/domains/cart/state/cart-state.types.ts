import type { CartItem } from "../types/cart.types";

export type CartAction =
  | {
      type: "itemAdded";
      payload: CartItem;
    }
  | {
      type: "itemRemoved";
      payload: string;
    }
  | {
      type: "cartCleared";
    };

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}
