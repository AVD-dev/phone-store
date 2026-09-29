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
        {colors.map((color) => (
          <label
            key={color.id}
            className="color-options__item"
            onMouseEnter={() => setHoveredColorId(color.id)}
            onMouseLeave={() => setHoveredColorId(undefined)}
          >
            <input
              type="radio"
              name="color"
              value={color.value}
              checked={selectedColor === color.value}
              onChange={() => onChange(color.value)}
            />

            <span
              className="color-selector__swatch"
              style={{ backgroundColor: color.value }}
            />
          </label>
        ))}
      </div>
      {displayedColor && (
        <span className="color-selector__label">{displayedColor}</span>
      )}
    </div>
  );
}
