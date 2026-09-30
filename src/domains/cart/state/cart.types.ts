export interface CartItem {
  id: string;
  name: string;
  storage: string;
  color: CartItemColor;
  price: number;
}

export interface CartItemColor {
  name: string;
  imageUrl: string;
}

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
