import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import ColorSelector from "./color-selector";

const colors = [
  { id: "Black", value: "#000000", imageUrl: "" },
  { id: "Blue", value: "#0000ff", imageUrl: "" },
  { id: "White", value: "#ffffff", imageUrl: "" },
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
        selectedColor="#0000ff"
        onChange={vi.fn()}
      />,
    );

    const radios = screen.getAllByRole("radio");

    expect(radios[1]).toBeChecked();
  });

  it("should call onChange with the selected color value", async () => {
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
      id: "Blue",
      value: "#0000ff",
      imageUrl: "",
    });
  });

  it("should display the selected color id", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="#0000ff"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("should display the hovered color id instead of the selected one", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="#000000"
        onChange={vi.fn()}
      />,
    );

    const options = document.querySelectorAll(".color-options__item");

    fireEvent.mouseEnter(options[1]);

    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.queryByText("Black")).not.toBeInTheDocument();
  });

  it("should restore the selected color id when hover ends", () => {
    render(
      <ColorSelector
        colors={colors}
        selectedColor="#000000"
        onChange={vi.fn()}
      />,
    );

    const options = document.querySelectorAll(".color-options__item");

    fireEvent.mouseEnter(options[1]);

    expect(screen.getByText("Blue")).toBeInTheDocument();

    fireEvent.mouseLeave(options[1]);

    expect(screen.getByText("Black")).toBeInTheDocument();
  });
});
