import type { ColorOption } from "../../../ui/color-selector/color-selector.types";

export interface ProductInfoProps {
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
