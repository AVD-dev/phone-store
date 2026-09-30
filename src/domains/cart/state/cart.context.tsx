import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";

import type { CartContextValue } from "./cart-state.types";
import { cartReducer } from "./cart.reducer";
import type { CartItem } from "../types/cart.types";
import { loadCart, saveCart } from "../data-access/storage/cart-storage";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, loadCart());

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const addItem = (item: CartItem): void => {
    dispatch({
      type: "itemAdded",
      payload: item,
    });
  };

  const removeItem = (id: string): void => {
    dispatch({
      type: "itemRemoved",
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: state,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
