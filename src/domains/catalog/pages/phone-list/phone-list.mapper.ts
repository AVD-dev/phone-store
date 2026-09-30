import type { ProductDto } from "../../data-access/product-summary.dto";
import type { PhoneListItemViewModel } from "./phone-list.viewmodel";

export function toPhoneCardViewModel(
  product: ProductDto,
): PhoneListItemViewModel {
  return {
    id: product.id,
    card: {
      imageUrl: product.imageUrl,
      brand: product.brand.toUpperCase(),
      labels: [product.name],
      price: `${product.basePrice} EUR`,
      orientation: "column",
    },
  };
}
