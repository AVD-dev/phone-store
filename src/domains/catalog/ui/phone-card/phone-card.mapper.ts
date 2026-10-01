import type { ProductSummary } from "../../types/product-summary.type";
import type { PhoneCardProps } from "./phone-card.types";

export function toPhoneCardViewModel(product: ProductSummary): PhoneCardProps {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    brand: product.brand.toUpperCase(),
    labels: [product.name],
    price: `${product.basePrice} EUR`,
    orientation: "column",
  };
}
