import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PhoneSpecifications from "./phone-specifications";

const specifications = {
  brand: "Apple",
  name: "iPhone 16",
  description: "Phone description",
  screen: "6.1 inches",
  resolution: "2556 × 1179",
  processor: "A18",
  mainCamera: "48 MP",
  selfieCamera: "12 MP",
  battery: "3561 mAh",
  os: "iOS",
  screenRefreshRate: "60 Hz",
};

describe("PhoneSpecifications", () => {
  afterEach(() => cleanup());

  it("should render every specification", () => {
    render(<PhoneSpecifications {...specifications} />);

    expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();

    Object.values(specifications).forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
