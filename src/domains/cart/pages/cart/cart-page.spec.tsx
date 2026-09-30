import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CartPage from "./cart-page";
import { useCart } from "../../state/cart.context";

vi.mock("../../state/cart.context", () => ({
  useCart: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const useCartMock = vi.mocked(useCart);
const useNavigateMock = vi.mocked(useNavigate);

const itemsMock = [
  {
    id: "cart-1",
    name: "Phone X",
    storage: "128 GB",
    color: {
      name: "Black",
      imageUrl: "phone-black.png",
    },
    price: 799,
  },
  {
    id: "cart-2",
    name: "Phone Y",
    storage: "256 GB",
    color: {
      name: "Green",
      imageUrl: "phone-green.png",
    },
    price: 999,
  },
];

describe("CartPage", () => {
  const removeItem = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useNavigateMock.mockReturnValue(navigate);

    useCartMock.mockReturnValue({
      items: itemsMock,
      addItem: vi.fn(),
      removeItem,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render cart items", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("CART (2)")).toBeInTheDocument();

    expect(screen.getByText("PHONE X")).toBeInTheDocument();
    expect(screen.getByText("PHONE Y")).toBeInTheDocument();

    expect(screen.getByText("128 GB | BLACK")).toBeInTheDocument();

    expect(screen.getByText("256 GB | GREEN")).toBeInTheDocument();

    expect(screen.getByText("799 EUR")).toBeInTheDocument();
    expect(screen.getByText("999 EUR")).toBeInTheDocument();
  });

  it("should calculate and render total price", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("TOTAL")).toBeInTheDocument();
    expect(screen.getByText("1798 EUR")).toBeInTheDocument();
  });

  it("should remove selected item", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    const deleteButtons = screen.getAllByRole("button", {
      name: "Eliminar",
    });

    await user.click(deleteButtons[0]);

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith("cart-1");
  });

  it("should navigate to product list when continue shopping is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: "CONTINUE SHOPPING",
      }),
    );

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/list");
  });

  it("should render pay button when cart has items", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "PAY" })).toBeInTheDocument();
  });

  it("should hide total and pay button when cart is empty", () => {
    useCartMock.mockReturnValue({
      items: [],
      addItem: vi.fn(),
      removeItem,
    });

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("CART (0)")).toBeInTheDocument();

    expect(screen.queryByText("TOTAL")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "PAY" }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "CONTINUE SHOPPING",
      }),
    ).toBeInTheDocument();
  });
});
