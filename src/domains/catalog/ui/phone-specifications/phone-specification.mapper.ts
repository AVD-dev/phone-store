import type { ProductDetail } from "../../types/product-detail.type";
import type { PhoneSpecificationProps } from "./phone-specification.types";

export function toProductSpecificationsViewModel(
  product: ProductDetail,
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
