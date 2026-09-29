import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import ProductInfo from "./product-info";

const storageOptions = [
  {
    capacity: "128 GB",
    price: 799,
  },
  {
    capacity: "256 GB",
    price: 899,
  },
];

const colors = [
  {
    id: "Black",
    value: "#000000",
  },
  {
    id: "Green",
    value: "#00ff00",
  },
];

describe("ProductInfo", () => {
  afterEach(() => cleanup());

  it("should render product information", () => {
    render(
      <ProductInfo
        imageUrl="phone.png"
        name="Phone X"
        basePrice={699}
        storageOptions={storageOptions}
        colors={colors}
      />,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "phone.png");

    expect(screen.getByText("Phone X")).toBeInTheDocument();

    expect(screen.getByText("From 699 EUR")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "AÑADIR" })).toBeInTheDocument();
  });

  it("should render all storage options", () => {
    render(
      <ProductInfo
        imageUrl="phone.png"
        name="Phone X"
        basePrice={699}
        storageOptions={storageOptions}
        colors={colors}
      />,
    );

    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
  });

  it("should select a storage option and update the price", async () => {
    const user = userEvent.setup();

    render(
      <ProductInfo
        imageUrl="phone.png"
        name="Phone X"
        basePrice={699}
        storageOptions={storageOptions}
        colors={colors}
      />,
    );

    const storage256 = screen.getByDisplayValue("899");

    await user.click(storage256);

    expect(storage256).toBeChecked();

    expect(screen.getByText("899 EUR")).toBeInTheDocument();

    expect(screen.queryByText("From 699 EUR")).not.toBeInTheDocument();
  });

  it("should only allow one storage option to be selected", async () => {
    const user = userEvent.setup();

    render(
      <ProductInfo
        imageUrl="phone.png"
        name="Phone X"
        basePrice={699}
        storageOptions={storageOptions}
        colors={colors}
      />,
    );

    const storage128 = screen.getByDisplayValue("799");
    const storage256 = screen.getByDisplayValue("899");

    await user.click(storage128);

    expect(storage128).toBeChecked();
    expect(storage256).not.toBeChecked();

    await user.click(storage256);

    expect(storage256).toBeChecked();
    expect(storage128).not.toBeChecked();

    expect(screen.getByText("899 EUR")).toBeInTheDocument();
  });

  it("should render the color selector", () => {
    render(
      <ProductInfo
        imageUrl="phone.png"
        name="Phone X"
        basePrice={699}
        storageOptions={storageOptions}
        colors={colors}
      />,
    );

    expect(screen.getByText("COLOR: PICK YOUR FAVORITE.")).toBeInTheDocument();

    expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();

    expect(screen.getByDisplayValue("#00ff00")).toBeInTheDocument();
  });
});
