import { useState } from "react";
import "./color-selector.scss";
import type { ColorSelectorProps } from "./color-selector.types";

export default function ColorSelector({
  colors,
  selectedColor,
  onChange,
}: ColorSelectorProps) {
  const [hoveredColorId, setHoveredColorId] = useState<string | undefined>();

  const selectedColorId = colors.find(
    (color) => color.value === selectedColor,
  )?.id;

  const displayedColor = hoveredColorId ?? selectedColorId;

  return (
    <div className="color-selector">
      <div className="color-options">
        {colors.map((option) => (
          <label
            key={option.id}
            className="color-options__item"
            onMouseEnter={() => setHoveredColorId(option.id)}
            onMouseLeave={() => setHoveredColorId(undefined)}
          >
            <input
              type="radio"
              name="color"
              value={option.value}
              checked={selectedColor === option.value}
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
