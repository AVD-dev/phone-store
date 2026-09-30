import { type PropsWithChildren, useEffect, useReducer } from "react";

import { CartContext } from "./cart.context";
import { cartReducer } from "./cart.reducer";
import type { CartItem } from "./cart.types";
import { loadCart, saveCart } from "../infrastructure/cart-storage";

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
