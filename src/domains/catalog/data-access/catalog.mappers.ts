import type {
  ProductColor,
  ProductDetail,
  ProductStorage,
} from "../types/product-detail.type";
import type {
  ProductColorDto,
  ProductDetailDto,
  ProductStorageDto,
} from "./product-detail.dto";

export const mapProductDetailToDomain = (
  product: ProductDetailDto,
): ProductDetail => {
  return {
    id: product.id,
    brand: product.brand,
    name: product.name,
    description: product.description,
    basePrice: product.basePrice,
    rating: product.rating,
    specs: product.specs,
    imageUrl: product.colorOptions[0].imageUrl,
    colors: product.colorOptions.map(mapProductColorToDomain),
    storageOptions: product.storageOptions.map(mapProductStorageToDomain),
    similarProducts: product.similarProducts,
  };
};

const mapProductColorToDomain = (color: ProductColorDto): ProductColor => {
  return {
    id: crypto.randomUUID(),
    name: color.name,
    hexCode: color.hexCode,
    imageUrl: color.imageUrl,
  };
};

const mapProductStorageToDomain = (
  storage: ProductStorageDto,
): ProductStorage => {
  return {
    id: crypto.randomUUID(),
    price: storage.price,
    capacity: storage.capacity,
  };
};
