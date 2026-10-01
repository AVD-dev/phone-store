import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PhoneCard from "./phone-card";

describe("PhoneCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render image, brand, labels and price", () => {
    render(
      <PhoneCard
        imageUrl="phone.png"
        brand="Apple"
        labels={["iPhone 16", "128 GB"]}
        price="999 €"
      />,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "phone.png");
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 16")).toBeInTheDocument();
    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("999 €")).toBeInTheDocument();
  });

  it("should not render brand when it is not provided", () => {
    render(
      <PhoneCard imageUrl="phone.png" labels={["iPhone 16"]} price="999 €" />,
    );

    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("should render all labels", () => {
    const labels = ["iPhone 16", "128 GB", "Black"];

    render(<PhoneCard imageUrl="phone.png" labels={labels} price="999 €" />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
