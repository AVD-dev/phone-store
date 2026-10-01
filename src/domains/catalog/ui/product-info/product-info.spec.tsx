import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ProductInfo from "./product-info";
import type {
  ProductDetail,
  ProductSpecifications,
} from "../../types/product-detail.type";

const storageOptions = [
  {
    id: "1",
    capacity: "128 GB",
    price: 799,
  },
  {
    id: "2",
    capacity: "256 GB",
    price: 899,
  },
];

const colors = [
  {
    id: "Black",
    name: "firstColor",
    hexCode: "#000000",
    imageUrl: "phone-black.png",
  },
  {
    id: "Green",
    name: "secondColor",
    hexCode: "#00ff00",
    imageUrl: "phone-green.png",
  },
];

const data: ProductDetail = {
  id: "randomId",
  brand: "someBrand",
  name: "Phone X",
  description: "",
  basePrice: 699,
  rating: 1,
  specs: {} as ProductSpecifications,
  imageUrl: "phone.png",
  colors,
  storageOptions,
  similarProducts: [],
};

describe("ProductInfo", () => {
  afterEach(() => cleanup());

  it("should render product information", () => {
    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "phone.png");
    expect(screen.getByText("Phone X")).toBeInTheDocument();
    expect(screen.getByText("From 699 EUR")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "AÑADIR" })).toBeInTheDocument();
  });

  it("should render all storage options", () => {
    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
  });

  it("should select a storage option and update the price", async () => {
    const user = userEvent.setup();

    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    const storage256 = screen.getByDisplayValue("2");

    await user.click(storage256);

    expect(storage256).toBeChecked();
    expect(screen.getByText("899 EUR")).toBeInTheDocument();
    expect(screen.queryByText("From 699 EUR")).not.toBeInTheDocument();
  });

  it("should only allow one storage option to be selected", async () => {
    const user = userEvent.setup();

    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    const storage128 = screen.getByDisplayValue("1");
    const storage256 = screen.getByDisplayValue("2");

    await user.click(storage128);

    expect(storage128).toBeChecked();
    expect(storage256).not.toBeChecked();

    await user.click(storage256);

    expect(storage256).toBeChecked();
    expect(storage128).not.toBeChecked();

    expect(screen.getByText("899 EUR")).toBeInTheDocument();
  });

  it("should render the color selector", () => {
    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    expect(screen.getByText("COLOR: PICK YOUR FAVORITE.")).toBeInTheDocument();

    expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#00ff00")).toBeInTheDocument();
  });

  it("should disable add button until color and storage are selected", async () => {
    const user = userEvent.setup();

    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    const addButton = screen.getByRole("button", {
      name: "AÑADIR",
    });

    expect(addButton).toBeDisabled();

    await user.click(screen.getByDisplayValue("1"));

    expect(addButton).toBeDisabled();

    await user.click(screen.getByDisplayValue("#000000"));

    expect(addButton).toBeEnabled();
  });

  it("should update product image when a color is selected", async () => {
    const user = userEvent.setup();

    render(<ProductInfo data={data} onAdd={vi.fn()} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "phone.png");

    await user.click(screen.getByDisplayValue("#00ff00"));

    expect(image).toHaveAttribute("src", "phone-green.png");
  });

  it("should call onAdd with selected color and storage ids", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<ProductInfo data={data} onAdd={onAdd} />);

    await user.click(screen.getByDisplayValue("2"));
    await user.click(screen.getByDisplayValue("#000000"));

    await user.click(
      screen.getByRole("button", {
        name: "AÑADIR",
      }),
    );

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith("Black", "2");
  });
});
