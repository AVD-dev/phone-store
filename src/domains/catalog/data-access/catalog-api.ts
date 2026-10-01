import type { ProductDetail } from "../types/product-detail.type";
import type { ProductSummary } from "../types/product-summary.type";
import {
  mapProductDetailToDomain,
  mapProductSummaryToDomain,
} from "./catalog.mappers";
import type { ProductDetailDto } from "./product-detail.dto";
import type {
  GetProductSummaryParams,
  ProductSummaryDto,
} from "./product-summary.dto";

const PRODUCTS_URL = import.meta.env.VITE_API_URL;
const productDetailCache = new Map<string, Promise<ProductDetail>>();
const productsCache = new Map<string, Promise<ProductSummary[]>>();

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

async function getProductsSummary(
  params: GetProductSummaryParams = {},
): Promise<ProductSummary[]> {
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
  const dto: ProductSummaryDto[] = await response.json();

  return dto.map(mapProductSummaryToDomain);
}

export function getProductSummarySuspense(
  params: GetProductSummaryParams = {},
): Promise<ProductSummary[]> {
  const key = JSON.stringify(params);

  const cached = productsCache.get(key);

  if (cached) {
    return cached;
  }

  const request = getProductsSummary(params);
  productsCache.set(key, request);

  return request;
}

async function getProductById(id: string): Promise<ProductDetail> {
  const url = new URL(`${PRODUCTS_URL}/${id}`);
  const response = await catalogFetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load product by ID: ${response.status}`);
  }

  const dto: ProductDetailDto = await response.json();

  return mapProductDetailToDomain(dto);
}

export function getProductByIdSuspense(id: string) {
  const cached = productDetailCache.get(id);

  if (cached) {
    return cached;
  }

  const request = getProductById(id);
  productDetailCache.set(id, request);

  return request;
}
