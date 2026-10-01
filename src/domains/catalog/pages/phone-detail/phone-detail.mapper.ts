import type { ColorOption } from "../../../../components/color-selector/color-selector.types";
import type { ProductDetailDto } from "../../data-access/product-detail.dto";
import type {
  ProductInfoData,
  StorageOption,
} from "../../ui/product-info/product-info.types";

export function toProductInfoViewModel(
  product: ProductDetailDto,
): ProductInfoData {
  return {
    imageUrl: product.colorOptions[0].imageUrl,
    name: product.name,
    basePrice: product.basePrice,
    storageOptions: product.storageOptions.map(
      (option) =>
        ({
          price: option.price,
          capacity: option.capacity,
        }) satisfies StorageOption,
    ),
    colors: product.colorOptions.map(
      (color) =>
        ({
          id: color.name,
          value: color.hexCode,
          imageUrl: color.imageUrl,
        }) satisfies ColorOption,
    ),
  };
}
