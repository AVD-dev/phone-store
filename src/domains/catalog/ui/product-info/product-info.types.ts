import type { ProductDetail } from "../../types/product-detail.type";

export interface ProductInfoProps {
  data: ProductDetail;
  onAdd: (colorId: string, storageId: string) => void;
}
