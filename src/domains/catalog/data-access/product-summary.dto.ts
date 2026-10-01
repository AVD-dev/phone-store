export type ProductSummaryDto = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type GetProductSummaryParams = {
  search?: string;
  limit?: number;
  offset?: number;
};
