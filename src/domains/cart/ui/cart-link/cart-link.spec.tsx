import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CartLink from "./cart-link";
import { useCart } from "../../state/use-cart";

vi.mock("../../state/use-cart", () => ({
  useCart: vi.fn(),
}));

const useCartMock = vi.mocked(useCart);

describe("CartLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useCartMock.mockReturnValue({
      items: [],
      addItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the cart link outside cart route", () => {
    render(
      <MemoryRouter initialEntries={["/list"]}>
        <CartLink />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should display the number of cart items", () => {
    useCartMock.mockReturnValue({
      items: [
        {
          id: "1",
          name: "Phone X",
          storage: "128 GB",
          color: {
            name: "Black",
            imageUrl: "black.png",
          },
          price: 799,
        },
        {
          id: "2",
          name: "Phone Y",
          storage: "256 GB",
          color: {
            name: "Green",
            imageUrl: "green.png",
          },
          price: 999,
        },
      ],
      addItem: vi.fn(),
      removeItem: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/list"]}>
        <CartLink />
      </MemoryRouter>,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should navigate to cart", () => {
    render(
      <MemoryRouter initialEntries={["/list"]}>
        <CartLink />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/cart");
  });

  it("should not render the cart link on cart route", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <CartLink />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
