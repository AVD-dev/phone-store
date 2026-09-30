import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PhoneListPage from "./phone-list-page";
import { getProducts } from "../../data-access/catalog-api";

vi.mock("../../data-access/catalog-api", () => ({
  getProducts: vi.fn(),
}));

const getProductsMock = vi.mocked(getProducts);

const productsMock = [
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

describe("PhoneListPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("should load the first 20 products after 300ms", async () => {
    getProductsMock.mockResolvedValue(productsMock);

    render(
      <MemoryRouter>
        <PhoneListPage />
      </MemoryRouter>,
    );

    expect(getProductsMock).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(getProductsMock).toHaveBeenCalledTimes(1);
    expect(getProductsMock).toHaveBeenCalledWith({
      limit: 20,
      search: "",
    });

    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();
  });

  it("should search products 300ms after the search value changes", async () => {
    getProductsMock.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <PhoneListPage />
      </MemoryRouter>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });

    getProductsMock.mockClear();

    const input = screen.getByPlaceholderText("Search for a smartphone...");

    fireEvent.change(input, {
      target: {
        value: "Samsung",
      },
    });

    expect(input).toHaveValue("Samsung");
    expect(getProductsMock).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(299);
    });

    expect(getProductsMock).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });

    expect(getProductsMock).toHaveBeenCalledTimes(1);

    expect(getProductsMock).toHaveBeenCalledWith({
      limit: 20,
      search: "Samsung",
    });
  });

  it("should remove duplicated products by id", async () => {
    getProductsMock.mockResolvedValue([
      productsMock[0],
      productsMock[0],
      productsMock[1],
    ]);

    render(
      <MemoryRouter>
        <PhoneListPage />
      </MemoryRouter>,
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("2 RESULTS")).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("should render each product as a link to its detail", async () => {
    getProductsMock.mockResolvedValue(productsMock);

    render(
      <MemoryRouter>
        <PhoneListPage />
      </MemoryRouter>,
    );

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/phones/1");
    expect(links[1]).toHaveAttribute("href", "/phones/2");
  });
});
