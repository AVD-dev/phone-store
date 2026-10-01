export type ProductDetail = {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecifications;
  imageUrl: string;
  colors: ProductColor[];
  storageOptions: ProductStorage[];
  similarProducts: SimilarProduct[];
};

export type ProductColor = {
  id: string;
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type ProductStorage = {
  id: string;
  capacity: string;
  price: number;
};

export type ProductSpecifications = {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
};

type SimilarProduct = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};
