import type { CartItem } from "../../../cart/types/cart.types";
import type { ProductDetail } from "../../types/product-detail.type";

interface ProductSelection {
  colorId: string;
  storageId: string;
}

export function toCartItem(
  product: ProductDetail,
  selection: ProductSelection,
): CartItem | undefined {
  const color = product.colors.find(({ id }) => id === selection.colorId);
  const storage = product.storageOptions.find(
    ({ id }) => id === selection.storageId,
  );

  if (!color || !storage) return undefined;

  return {
    id: product.id,
    name: product.name,
    storage: storage.capacity,
    color: {
      name: color.name,
      imageUrl: color.imageUrl,
    },
    price: storage.price,
  };
}
