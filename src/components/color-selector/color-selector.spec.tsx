import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ColorSelector from "./color-selector";

const colors = [
  {
    id: "black-id",
    name: "Black",
    value: "#000000",
    imageUrl: "",
  },
  {
    id: "blue-id",
    name: "Blue",
    value: "#0000ff",
    imageUrl: "",
  },
  {
    id: "white-id",
    name: "White",
    value: "#ffffff",
    imageUrl: "",
  },
];

describe("ColorSelector", () => {
  afterEach(() => cleanup());

  it("should render all colors", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor={undefined}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("should check the selected color", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="blue-id"
        onChange={vi.fn()}
      />,
    );

    const radios = screen.getAllByRole("radio");

    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it("should call onChange with the selected color option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <ColorSelector
        colors={colors}
        selectedColor={undefined}
        onChange={onChange}
      />,
    );

    const radios = screen.getAllByRole("radio");

    await user.click(radios[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      id: "blue-id",
      name: "Blue",
      value: "#0000ff",
      imageUrl: "",
    });
  });

  it("should display the selected color value", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="blue-id"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText("#0000ff")).toBeInTheDocument();
  });

  it("should display the hovered color name instead of the selected color value", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="black-id"
        onChange={vi.fn()}
      />,
    );

    const options = document.querySelectorAll(".color-options__item");

    fireEvent.mouseEnter(options[1]);

    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.queryByText("#000000")).not.toBeInTheDocument();
  });

  it("should restore the selected color value when hover ends", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="black-id"
        onChange={vi.fn()}
      />,
    );

    const options = document.querySelectorAll(".color-options__item");

    fireEvent.mouseEnter(options[1]);

    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.queryByText("#000000")).not.toBeInTheDocument();

    fireEvent.mouseLeave(options[1]);

    expect(screen.getByText("#000000")).toBeInTheDocument();
    expect(screen.queryByText("Blue")).not.toBeInTheDocument();
  });
});
