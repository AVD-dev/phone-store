export type ProductDto = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

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
  similarProducts: ProductDto[];
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

export type ProductColorDto = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type ProductStorageDto = {
  capacity: string;
  price: number;
};
