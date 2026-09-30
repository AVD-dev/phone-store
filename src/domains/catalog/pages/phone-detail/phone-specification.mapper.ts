import type { ProductDetailDto } from "../../data-access/product-summary.dto";
import type { PhoneSpecificationProps } from "../../ui/phone-specifications/phone-specification.types";

export function toProductSpecificationsViewModel(
  product: ProductDetailDto,
): PhoneSpecificationProps {
  return {
    brand: product.brand,
    name: product.name,
    description: product.description,
    screen: product.specs.screen,
    resolution: product.specs.resolution,
    processor: product.specs.processor,
    mainCamera: product.specs.mainCamera,
    selfieCamera: product.specs.selfieCamera,
    battery: product.specs.battery,
    os: product.specs.os,
    screenRefreshRate: product.specs.screenRefreshRate,
  };
}
