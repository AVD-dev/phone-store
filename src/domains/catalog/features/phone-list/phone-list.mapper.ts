import type { ProductSummaryDto } from "../../data-access/product-summary.dto";
import type { PhoneCardViewModel } from "../../ui/phone-card/phone-card.props";

export function toPhoneCardViewModel(
  product: ProductSummaryDto,
): PhoneCardViewModel {
  return {
    id: product.id,
    imageUrl: product.imageUrl,
    brand: product.brand,
    labels: [product.name],
    price: `${product.basePrice} EUR`,
    orientation: "column",
  };
}
