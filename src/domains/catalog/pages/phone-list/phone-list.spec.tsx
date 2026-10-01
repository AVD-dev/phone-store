import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PhoneListPage from "./phone-list-page";
import { getProductSummarySuspense } from "../../data-access/catalog-api";
import type { ProductSummary } from "../../types/product-summary.type";

vi.mock("../../data-access/catalog-api", () => ({
  getProductSummarySuspense: vi.fn(),
}));

vi.mock("../../../../components/phone-card/phone-card", () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

const getProductSummarySuspenseMock = vi.mocked(getProductSummarySuspense);

const productsMock: ProductSummary[] = [
  {
    id: "1",
    brand: "Apple",
    name: "iPhone 16",
    basePrice: 999,
    imageUrl: "iphone.png",
  },
  {
    id: "2",
    brand: "Samsung",
    name: "Galaxy S25",
    basePrice: 899,
    imageUrl: "galaxy.png",
  },
];

function fulfilledPromise<T>(value: T): Promise<T> {
  const promise = Promise.resolve(value) as Promise<T> & {
    status: "fulfilled";
    value: T;
  };

  promise.status = "fulfilled";
  promise.value = value;

  return promise;
}

function renderPage() {
  return render(
    <MemoryRouter>
      <PhoneListPage />
    </MemoryRouter>,
  );
}

describe("PhoneListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    getProductSummarySuspenseMock.mockReturnValue(
      fulfilledPromise(productsMock),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("should load the first 20 products", () => {
    renderPage();

    expect(getProductSummarySuspenseMock).toHaveBeenCalledWith({
      limit: 20,
      search: "",
    });

    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();
  });

  it("should search products 300ms after the search value changes", async () => {
    const initialPromise = fulfilledPromise(productsMock);
    const samsungPromise = fulfilledPromise([]);

    getProductSummarySuspenseMock.mockImplementation((params) => {
      return params?.search === "Samsung" ? samsungPromise : initialPromise;
    });

    renderPage();

    expect(getProductSummarySuspenseMock).toHaveBeenCalledWith({
      limit: 20,
      search: "",
    });

    getProductSummarySuspenseMock.mockClear();

    const input = screen.getByPlaceholderText("Search for a smartphone...");

    fireEvent.change(input, {
      target: {
        value: "Samsung",
      },
    });

    expect(input).toHaveValue("Samsung");
    expect(getProductSummarySuspenseMock).not.toHaveBeenCalledWith({
      limit: 20,
      search: "Samsung",
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(299);
    });

    expect(getProductSummarySuspenseMock).not.toHaveBeenCalledWith({
      limit: 20,
      search: "Samsung",
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(getProductSummarySuspenseMock).toHaveBeenCalledWith({
      limit: 20,
      search: "Samsung",
    });
  });

  it("should remove duplicated products by id", () => {
    const productsWithDuplicates = [
      productsMock[0],
      productsMock[0],
      productsMock[1],
    ];

    getProductSummarySuspenseMock.mockReturnValue(
      fulfilledPromise(productsWithDuplicates),
    );

    renderPage();

    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("should render each product as a link to its detail", () => {
    renderPage();

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/phones/1");
    expect(links[1]).toHaveAttribute("href", "/phones/2");
  });

  it("should clear the search value", async () => {
    const initialPromise = fulfilledPromise(productsMock);

    getProductSummarySuspenseMock.mockReturnValue(initialPromise);

    renderPage();

    const input = screen.getByPlaceholderText("Search for a smartphone...");

    fireEvent.change(input, {
      target: {
        value: "Samsung",
      },
    });

    expect(input).toHaveValue("Samsung");

    fireEvent.click(
      screen.getByRole("button", {
        name: "X",
      }),
    );

    expect(input).toHaveValue("");
  });
});
