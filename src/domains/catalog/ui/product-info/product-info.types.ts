import type { ProductDetail } from "../../types/product-detail.type";

export interface ProductInfoProps {
  data: ProductDetail;
  onAdd: (hexCode: string, storagePrice: number) => void;
}
