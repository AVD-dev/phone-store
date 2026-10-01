import { useState } from "react";
import "./color-selector.scss";
import type { ColorSelectorProps } from "./color-selector.types";

export default function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps) {
  const [hoveredColorName, setHoveredColorName] = useState<string>("");

  const selectedColorValue = colors.find(
    (color) => color.id === selectedColor,
  )?.name;

  const displayedColor = hoveredColorName || selectedColorValue;
  console.log(hoveredColorName, selectedColorValue);
  return (
    <div className="color-selector">
      <div className="color-options">
        {colors.map((option) => (
          <label
            key={option.id}
            className="color-options__item"
            onMouseEnter={() => setHoveredColorName(option.name)}
            onMouseLeave={() => setHoveredColorName("")}
          >
            <input
              type="radio"
              name="color"
              value={option.value}
              checked={selectedColor === option.id}
              onChange={() => onChange(option)}
            />

            <span
              className="color-selector__swatch"
              style={{ backgroundColor: option.value }}
            />
          </label>
        ))}
      </div>
      <span className="color-selector__label">{displayedColor}</span>
    </div>
  );
}
