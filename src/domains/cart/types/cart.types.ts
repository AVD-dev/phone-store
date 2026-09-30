export interface CartItem {
  id: string;
  name: string;
  storage: string;
  color: CartItemColor;
  price: number;
}

interface CartItemColor {
  name: string;
  imageUrl: string;
}
