import type { ProductSummaryDto } from "../../data-access/product-summary.dto";
import type { PhoneCardProps } from "./phone-card.types";

export function toPhoneCardViewModel(
  product: ProductSummaryDto,
): PhoneCardProps {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    brand: product.brand.toUpperCase(),
    labels: [product.name],
    price: `${product.basePrice} EUR`,
    orientation: "column",
  };
}
