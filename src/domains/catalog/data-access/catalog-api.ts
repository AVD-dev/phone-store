import type { GetProductsParams } from "./get-products.dto";
import type { ProductSummaryDto } from "./product-summary.dto";

const PRODUCTS_URL = import.meta.env.VITE_API_URL;

const catalogFetch = (
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> => {
  return fetch(input, {
    ...init,
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      ...init.headers,
    },
  });
};

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductSummaryDto[]> {
  const url = new URL(PRODUCTS_URL);

  if (params.search) {
    url.searchParams.set("search", params.search);
  }

  if (params.limit !== undefined) {
    url.searchParams.set("limit", params.limit.toString());
  }

  if (params.offset !== undefined) {
    url.searchParams.set("offset", params.offset.toString());
  }

  const response = await catalogFetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }

  return response.json();
}
