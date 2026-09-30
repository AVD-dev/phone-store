import type { ColorOption } from "../../../ui/color-selector/color-selector.types";

export interface ProductInfoProps {
  data: ProductInfoData;
  onAdd: (hexCode: string, storagePrice: number) => void;
}

export interface ProductInfoData {
  imageUrl: string;
  name: string;
  basePrice: number;
  storageOptions: StorageOption[];
  colors: ColorOption[];
}

export interface StorageOption {
  price: number;
  capacity: string;
}
