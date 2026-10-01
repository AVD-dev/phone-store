import type { ColorOption } from "../color-selector/color-selector.types";

export interface ProductInfoStorageOption {
  id: string;
  label: string;
  price: string;
}

export interface ProductInfoProps {
  name: string;
  imageUrl: string;
  basePrice: string;
  colors: ColorOption[];
  storageOptions: ProductInfoStorageOption[];
  selectedColorId?: string;
  selectedStorageId?: string;
  onColorChange: (colorId: string) => void;
  onStorageChange: (storageId: string) => void;
  onAdd: () => void;
}
