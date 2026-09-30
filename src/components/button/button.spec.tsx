import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "./button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the label", () => {
    render(<Button label="Add to cart" onClick={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("should apply filled variant by default", () => {
    render(<Button label="Add" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Add" })).toHaveClass(
      "button-container",
      "button-container--filled",
    );
  });

  it("should apply outlined variant", () => {
    render(<Button label="Continue" variant="outlined" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Continue" })).toHaveClass(
      "button-container--outlined",
    );
  });

  it("should apply ghost variant", () => {
    render(<Button label="Remove" variant="ghost" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass(
      "button-container--ghost",
    );
  });

  it("should apply default severity by default", () => {
    render(<Button label="Add" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Add" })).toHaveClass(
      "button-container--default",
    );
  });

  it("should apply danger severity", () => {
    render(<Button label="Remove" severity="danger" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Remove" })).toHaveClass(
      "button-container--danger",
    );
  });

  it("should apply custom className", () => {
    render(<Button label="Pay" className="cart-action" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Pay" })).toHaveClass(
      "cart-action",
    );
  });

  it("should render the icon when provided", () => {
    render(
      <Button
        label="Back"
        icon={<span data-testid="button-icon">←</span>}
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("should not render an icon when it is not provided", () => {
    render(<Button label="Back" onClick={vi.fn()} />);

    expect(screen.queryByTestId("button-icon")).not.toBeInTheDocument();
  });

  it("should be enabled by default", () => {
    render(<Button label="Add" onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Add" })).toBeEnabled();
  });

  it("should be disabled when disabled is true", () => {
    render(<Button label="Add" disabled onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
  });

  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button label="Add" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button label="Add" disabled onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
