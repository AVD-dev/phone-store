import type { ProductSummary } from "../../types/product-summary.type";
import type { CatalogPhoneCardViewModel } from "./phone-card.view-model";

export function toPhoneCardViewModel(
  product: ProductSummary,
): CatalogPhoneCardViewModel {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    brand: product.brand.toUpperCase(),
    labels: [product.name],
    price: `${product.basePrice} EUR`,
  };
}
