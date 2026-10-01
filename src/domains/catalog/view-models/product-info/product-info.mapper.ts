import type { ProductDetail } from "../../types/product-detail.type";
import type { ProductInfoViewModel } from "./product-info.view-model";

export function toProductInfoViewModel(
  product: ProductDetail,
): ProductInfoViewModel {
  return {
    name: product.name,
    imageUrl: product.imageUrl,
    basePrice: `From ${product.basePrice} EUR`,
    colors: product.colors.map((color) => ({
      id: color.id,
      name: color.name,
      value: color.hexCode,
      imageUrl: color.imageUrl,
    })),
    storageOptions: product.storageOptions.map((storage) => ({
      id: storage.id,
      label: storage.capacity,
      price: `${storage.price} EUR`,
    })),
  };
}
