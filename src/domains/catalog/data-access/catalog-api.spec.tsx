import "@testing-library/jest-dom/vitest";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProducts } from "./catalog-api";

describe("getProducts", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should request products with the api key header", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    await getProducts();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];

    expect(url.toString()).toBe(import.meta.env.VITE_API_URL);

    expect(init).toEqual(
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-api-key": import.meta.env.VITE_API_KEY,
        }),
      }),
    );
  });

  it("should add search, limit and offset query params", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
      }),
    );

    await getProducts({
      search: "Samsung",
      limit: 20,
      offset: 10,
    });

    const [requestUrl] = fetchMock.mock.calls[0];

    const url = new URL(requestUrl.toString());

    expect(url.searchParams.get("search")).toBe("Samsung");
    expect(url.searchParams.get("limit")).toBe("20");
    expect(url.searchParams.get("offset")).toBe("10");
  });

  it("should return the products response", async () => {
    const products = [
      {
        id: "1",
        brand: "Apple",
        name: "iPhone 16",
        basePrice: 999,
        imageUrl: "iphone.png",
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(products), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await getProducts();

    expect(result).toEqual(products);
  });

  it("should throw when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(getProducts()).rejects.toThrow("Failed to load products: 500");
  });
});
