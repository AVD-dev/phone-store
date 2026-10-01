import { useState } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ProductInfo from "./product-info";

const storageOptions = [
  { id: "1", label: "128 GB", price: "799 EUR" },
  { id: "2", label: "256 GB", price: "899 EUR" },
];

const colors = [
  {
    id: "Black",
    name: "firstColor",
    value: "#000000",
    imageUrl: "phone-black.png",
  },
  {
    id: "Green",
    name: "secondColor",
    value: "#00ff00",
    imageUrl: "phone-green.png",
  },
];

interface ProductInfoHarnessProps {
  onAdd?: () => void;
}

function ProductInfoHarness({ onAdd = vi.fn() }: ProductInfoHarnessProps) {
  const [selectedColorId, setSelectedColorId] = useState<string>();
  const [selectedStorageId, setSelectedStorageId] = useState<string>();

  return (
    <ProductInfo
      name="Phone X"
      imageUrl="phone.png"
      basePrice="From 699 EUR"
      colors={colors}
      storageOptions={storageOptions}
      selectedColorId={selectedColorId}
      selectedStorageId={selectedStorageId}
      onColorChange={setSelectedColorId}
      onStorageChange={setSelectedStorageId}
      onAdd={onAdd}
    />
  );
}

describe("ProductInfo", () => {
  afterEach(() => cleanup());

  it("should render product information", () => {
    render(<ProductInfoHarness />);

    expect(screen.getByRole("img", { name: "Phone X" })).toHaveAttribute(
      "src",
      "phone.png",
    );
    expect(screen.getByText("Phone X")).toBeInTheDocument();
    expect(screen.getByText("From 699 EUR")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "AÑADIR" })).toBeInTheDocument();
  });

  it("should render all storage options", () => {
    render(<ProductInfoHarness />);

    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
  });

  it("should select a storage option and update the price", async () => {
    const user = userEvent.setup();
    render(<ProductInfoHarness />);

    const storage256 = screen.getByDisplayValue("2");
    await user.click(storage256);

    expect(storage256).toBeChecked();
    expect(screen.getByText("899 EUR")).toBeInTheDocument();
    expect(screen.queryByText("From 699 EUR")).not.toBeInTheDocument();
  });

  it("should only allow one storage option to be selected", async () => {
    const user = userEvent.setup();
    render(<ProductInfoHarness />);

    const storage128 = screen.getByDisplayValue("1");
    const storage256 = screen.getByDisplayValue("2");

    await user.click(storage128);
    expect(storage128).toBeChecked();
    expect(storage256).not.toBeChecked();

    await user.click(storage256);
    expect(storage256).toBeChecked();
    expect(storage128).not.toBeChecked();
  });

  it("should render the color selector", () => {
    render(<ProductInfoHarness />);

    expect(screen.getByText("COLOR: PICK YOUR FAVORITE.")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#00ff00")).toBeInTheDocument();
  });

  it("should disable add button until color and storage are selected", async () => {
    const user = userEvent.setup();
    render(<ProductInfoHarness />);

    const addButton = screen.getByRole("button", { name: "AÑADIR" });
    expect(addButton).toBeDisabled();

    await user.click(screen.getByDisplayValue("1"));
    expect(addButton).toBeDisabled();

    await user.click(screen.getByDisplayValue("#000000"));
    expect(addButton).toBeEnabled();
  });

  it("should update product image when a color is selected", async () => {
    const user = userEvent.setup();
    render(<ProductInfoHarness />);

    const image = screen.getByRole("img", { name: "Phone X" });
    expect(image).toHaveAttribute("src", "phone.png");

    await user.click(screen.getByDisplayValue("#00ff00"));
    expect(image).toHaveAttribute("src", "phone-green.png");
  });

  it("should call onAdd", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ProductInfoHarness onAdd={onAdd} />);

    await user.click(screen.getByDisplayValue("2"));
    await user.click(screen.getByDisplayValue("#000000"));
    await user.click(screen.getByRole("button", { name: "AÑADIR" }));

    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
