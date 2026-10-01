import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getProductByIdSuspense } from "../../data-access/catalog-api";
import type {
  ProductDetail,
  ProductSpecifications,
} from "../../types/product-detail.type";

import { toProductSpecificationsViewModel } from "../../ui/phone-specifications/phone-specification.mapper";
import type { PhoneSpecificationProps } from "../../ui/phone-specifications/phone-specification.types";

import PhoneDetailPage from "./phone-detail-page";
import { useCart } from "../../../cart/state/cart.context";

let selectedColor = "black-id";
let selectedPrice = 899;

vi.mock("../../data-access/catalog-api", () => ({
  getProductByIdSuspense: vi.fn(),
}));

vi.mock("../../../cart/state/cart.context", () => ({
  useCart: vi.fn(),
}));

vi.mock("../../ui/phone-specifications/phone-specification.mapper", () => ({
  toProductSpecificationsViewModel: vi.fn(),
}));

vi.mock("../../ui/product-info/product-info", () => ({
  default: ({
    data,
    onAdd,
  }: {
    data: ProductDetail;
    onAdd: (colorId: string, price: number) => void;
  }) => (
    <div data-testid="product-info">
      <span>{data.name}</span>

      <button type="button" onClick={() => onAdd(selectedColor, selectedPrice)}>
        ADD MOCK
      </button>
    </div>
  ),
}));

vi.mock("../../ui/phone-specifications/phone-specifications", () => ({
  default: (props: PhoneSpecificationProps) => (
    <div data-testid="phone-specifications">{props.brand}</div>
  ),
}));

vi.mock("../../ui/phone-card/phone-card", () => ({
  default: () => <div data-testid="phone-card" />,
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

const productMock: ProductDetail = {
  id: "1",
  brand: "APPLE",
  name: "Phone X",
  description: "mock description",
  basePrice: 699,
  rating: 2,
  specs: {} as ProductSpecifications,
  imageUrl: "phone-black.png",
  colors: [
    {
      id: "black-id",
      name: "Black",
      hexCode: "#000000",
      imageUrl: "phone-black.png",
    },
    {
      id: "green-id",
      name: "Green",
      hexCode: "#00ff00",
      imageUrl: "phone-green.png",
    },
  ],
  storageOptions: [
    {
      id: "128-id",
      capacity: "128 GB",
      price: 799,
    },
    {
      id: "256-id",
      capacity: "256 GB",
      price: 899,
    },
  ],
  similarProducts: [],
};

const specificationsMock = {
  brand: "Samsung",
} as PhoneSpecificationProps;

const getProductByIdSuspenseMock = vi.mocked(getProductByIdSuspense);

const useCartMock = vi.mocked(useCart);

const toProductSpecificationsViewModelMock = vi.mocked(
  toProductSpecificationsViewModel,
);

const useNavigateMock = vi.mocked(useNavigate);

function fulfilledPromise<T>(value: T): Promise<T> {
  const promise = Promise.resolve(value) as Promise<T> & {
    status: "fulfilled";
    value: T;
  };

  promise.status = "fulfilled";
  promise.value = value;

  return promise;
}

function renderPage(phoneId = "1") {
  return render(
    <MemoryRouter initialEntries={[`/phones/${phoneId}`]}>
      <Routes>
        <Route path="/phones/:phoneId" element={<PhoneDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PhoneDetailPage", () => {
  const addItem = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useNavigateMock.mockReturnValue(navigate);

    selectedColor = "black-id";
    selectedPrice = 899;

    useCartMock.mockReturnValue({
      items: [],
      addItem,
      removeItem: vi.fn(),
    });

    getProductByIdSuspenseMock.mockReturnValue(fulfilledPromise(productMock));

    toProductSpecificationsViewModelMock.mockReturnValue(specificationsMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("should load product by route id", () => {
    renderPage("123");

    expect(getProductByIdSuspenseMock).toHaveBeenCalledTimes(1);
    expect(getProductByIdSuspenseMock).toHaveBeenCalledWith("123");
  });

  it("should map product specifications", () => {
    renderPage();

    expect(toProductSpecificationsViewModelMock).toHaveBeenCalledWith(
      productMock,
    );
  });

  it("should render product info and specifications", () => {
    renderPage();

    expect(screen.getByTestId("product-info")).toBeInTheDocument();
    expect(screen.getByText("Phone X")).toBeInTheDocument();

    expect(screen.getByTestId("phone-specifications")).toBeInTheDocument();

    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("should render back link to product list", () => {
    renderPage();

    expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute(
      "href",
      "/list",
    );
  });

  it("should add selected product to cart", async () => {
    const user = userEvent.setup();

    renderPage();

    const addButton = screen.getByRole("button", {
      name: "ADD MOCK",
    });

    await user.click(addButton);

    expect(addItem).toHaveBeenCalledTimes(1);

    expect(addItem).toHaveBeenCalledWith({
      id: "1",
      name: "Phone X",
      storage: "256 GB",
      color: {
        name: "Black",
        imageUrl: "phone-black.png",
      },
      price: 899,
    });

    expect(navigate).toHaveBeenCalledWith("/cart");
  });

  it("should not add item when selected color does not exist", async () => {
    const user = userEvent.setup();

    selectedColor = "invalid-id";

    renderPage();

    const addButton = screen.getByRole("button", {
      name: "ADD MOCK",
    });

    await user.click(addButton);

    expect(addItem).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it("should not add item when selected storage does not exist", async () => {
    const user = userEvent.setup();

    selectedPrice = 9999;

    renderPage();

    const addButton = screen.getByRole("button", {
      name: "ADD MOCK",
    });

    await user.click(addButton);

    expect(addItem).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
