export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  storage: string;
  color: string;
  price: string;
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
