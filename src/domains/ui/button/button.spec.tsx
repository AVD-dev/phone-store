import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Button from "./button";

describe("Button", () => {
  afterEach(() => cleanup());

  it("should render the label", () => {
    render(<Button label="Add to cart" />);

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("should apply padding by default", () => {
    render(<Button label="Add to cart" />);

    const button = screen.getByRole("button", {
      name: "Add to cart",
    });

    expect(button).toHaveClass("button-container", "button-container--space");
  });

  it("should apply outline class when outlined is true", () => {
    render(<Button label="Add to cart" outlined />);

    expect(screen.getByRole("button", { name: "Add to cart" })).toHaveClass(
      "button-container--outline",
    );
  });

  it("should not apply padding class when enablePadding is false", () => {
    render(<Button label="Add to cart" enablePadding={false} />);

    expect(screen.getByRole("button", { name: "Add to cart" })).not.toHaveClass(
      "button-container--space",
    );
  });

  it("should render the icon when provided", () => {
    render(
      <Button label="Back" icon={<span data-testid="button-icon">←</span>} />,
    );

    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("should not render an icon when it is not provided", () => {
    render(<Button label="Back" />);

    expect(screen.queryByTestId("button-icon")).not.toBeInTheDocument();
  });
});
