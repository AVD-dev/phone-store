import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Button from "./button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  const onClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => cleanup());

  it("should render the label", () => {
    render(<Button label="Add to cart" onClick={onClick} />);

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("should apply padding by default", () => {
    render(<Button label="Add to cart" onClick={onClick} />);

    expect(screen.getByRole("button", { name: "Add to cart" })).toHaveClass(
      "button-container",
      "button-container--space",
    );
  });

  it("should apply outline class when outlined is true", () => {
    render(<Button label="Add to cart" outlined onClick={onClick} />);

    expect(screen.getByRole("button", { name: "Add to cart" })).toHaveClass(
      "button-container--outline",
    );
  });

  it("should not apply padding class when enablePadding is false", () => {
    render(
      <Button label="Add to cart" enablePadding={false} onClick={onClick} />,
    );

    expect(screen.getByRole("button", { name: "Add to cart" })).not.toHaveClass(
      "button-container--space",
    );
  });

  it("should render the icon when provided", () => {
    render(
      <Button
        label="Back"
        icon={<span data-testid="button-icon">←</span>}
        onClick={onClick}
      />,
    );

    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("should not render an icon when it is not provided", () => {
    render(<Button label="Back" onClick={onClick} />);

    expect(screen.queryByTestId("button-icon")).not.toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();

    render(<Button label="Add to cart" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
