import type { ProductSummaryDto } from "./product-summary.dto";

export type ProductDetailDto = {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecsDto;
  colorOptions: ProductColorDto[];
  storageOptions: ProductStorageDto[];
  similarProducts: ProductSummaryDto[];
};

export type ProductSpecsDto = {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
};

type ProductColorDto = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

type ProductStorageDto = {
  capacity: string;
  price: number;
};
