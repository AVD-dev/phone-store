import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getProductById } from "../../data-access/catalog-api";
import type {
  ProductDetailDto,
  ProductSpecsDto,
} from "../../data-access/product-summary.dto";

import { toProductInfoViewModel } from "./phone-detail.mapper";
import { toProductSpecificationsViewModel } from "./phone-specification.mapper";

import type { ProductInfoData } from "../../ui/product-info/product-info.types";
import type { PhoneSpecificationProps } from "../../ui/phone-specifications/phone-specification.types";

import PhoneDetailPage from "./phone-detail-page";
import { useCart } from "../../../cart/state/cart.context";

let selectedColor = "#000000";
let selectedPrice = 899;

vi.mock("../../data-access/catalog-api", () => ({
  getProductById: vi.fn(),
}));

vi.mock("../../../cart/state/cart.context", () => ({
  useCart: vi.fn(),
}));

vi.mock("./phone-detail.mapper", () => ({
  toProductInfoViewModel: vi.fn(),
}));

vi.mock("./phone-specification.mapper", () => ({
  toProductSpecificationsViewModel: vi.fn(),
}));

vi.mock("../../ui/product-info/product-info", () => ({
  default: ({
    data,
    onAdd,
  }: {
    data: ProductInfoData;
    onAdd: (color: string, price: number) => void;
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

const productMock = {
  id: "1",
  name: "Phone X",
  basePrice: 699,
  brand: "APPLE",
  description: "mock description",
  rating: 2,
  specs: {} as ProductSpecsDto,
  colorOptions: [
    {
      name: "Black",
      hexCode: "#000000",
      imageUrl: "phone-black.png",
    },
    {
      name: "Green",
      hexCode: "#00ff00",
      imageUrl: "phone-green.png",
    },
  ],
  storageOptions: [
    {
      capacity: "128 GB",
      price: 799,
    },
    {
      capacity: "256 GB",
      price: 899,
    },
  ],
  similarProducts: [],
} as ProductDetailDto;

const phoneInfoMock = {
  imageUrl: "phone.png",
  name: "Phone X",
  basePrice: 699,
  storageOptions: [],
  colors: [],
} as ProductInfoData;

const specificationsMock = {
  brand: "Samsung",
} as PhoneSpecificationProps;

const getProductByIdMock = vi.mocked(getProductById);
const useCartMock = vi.mocked(useCart);

const toProductInfoViewModelMock = vi.mocked(toProductInfoViewModel);

const toProductSpecificationsViewModelMock = vi.mocked(
  toProductSpecificationsViewModel,
);

const useNavigateMock = vi.mocked(useNavigate);

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

    selectedColor = "#000000";
    selectedPrice = 899;

    useCartMock.mockReturnValue({
      items: [],
      addItem,
      removeItem: vi.fn(),
    });

    getProductByIdMock.mockResolvedValue(productMock);

    toProductInfoViewModelMock.mockReturnValue(phoneInfoMock);

    toProductSpecificationsViewModelMock.mockReturnValue(specificationsMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("should load product by route id", async () => {
    renderPage("123");

    await waitFor(() => {
      expect(getProductByIdMock).toHaveBeenCalledTimes(1);
    });

    expect(getProductByIdMock).toHaveBeenCalledWith("123");
  });

  it("should map the loaded product", async () => {
    renderPage();

    await waitFor(() => {
      expect(toProductInfoViewModelMock).toHaveBeenCalledWith(productMock);
    });

    expect(toProductSpecificationsViewModelMock).toHaveBeenCalledWith(
      productMock,
    );
  });

  it("should render product info and specifications", async () => {
    renderPage();

    expect(await screen.findByTestId("product-info")).toBeInTheDocument();

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

    const addButton = await screen.findByRole("button", {
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

    selectedColor = "#invalid";

    renderPage();

    const addButton = await screen.findByRole("button", {
      name: "ADD MOCK",
    });

    await user.click(addButton);

    expect(addItem).not.toHaveBeenCalled();
  });

  it("should not add item when selected storage does not exist", async () => {
    const user = userEvent.setup();

    selectedPrice = 9999;

    renderPage();

    const addButton = await screen.findByRole("button", {
      name: "ADD MOCK",
    });

    await user.click(addButton);

    expect(addItem).not.toHaveBeenCalled();
  });
});
