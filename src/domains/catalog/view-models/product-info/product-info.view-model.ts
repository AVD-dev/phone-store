import type { ProductInfoProps } from "../../../../components/product-info/product-info.types";

export type ProductInfoViewModel = Pick<
  ProductInfoProps,
  "name" | "imageUrl" | "basePrice" | "colors" | "storageOptions"
>;
