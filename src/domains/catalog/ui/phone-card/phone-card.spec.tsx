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
        orientation="column"
      />,
    );

    expect(screen.getByRole("img")).toHaveAttribute("src", "phone.png");

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 16")).toBeInTheDocument();
    expect(screen.getByText("128 GB")).toBeInTheDocument();
    expect(screen.getByText("999 €")).toBeInTheDocument();
  });

  it("should use column orientation by default", () => {
    const { container } = render(
      <PhoneCard imageUrl="phone.png" price="999 €" orientation="column" />,
    );

    expect(container.firstChild).toHaveClass(
      "phone-card",
      "phone-card--column",
    );
  });

  it("should use row orientation when specified", () => {
    const { container } = render(
      <PhoneCard imageUrl="phone.png" price="999 €" orientation="row" />,
    );

    expect(container.firstChild).toHaveClass("phone-card", "phone-card--row");
  });

  it("should not render brand when it is not provided", () => {
    render(
      <PhoneCard
        imageUrl="phone.png"
        labels={["iPhone 16"]}
        price="999 €"
        orientation="column"
      />,
    );

    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("should render all labels", () => {
    const labels = ["iPhone 16", "128 GB", "Black"];

    render(
      <PhoneCard
        imageUrl="phone.png"
        labels={labels}
        price="999 €"
        orientation="column"
      />,
    );

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
