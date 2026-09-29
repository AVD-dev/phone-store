import type { ProductSummaryDto } from "../../data-access/product-summary.dto";
import type { PhoneListItemViewModel } from "./phone-list.viewmodel";

export function toPhoneCardViewModel(
  product: ProductSummaryDto,
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
