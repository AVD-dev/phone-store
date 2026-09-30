import "./button.scss";
import type { ButtonProps } from "./button.types";

export default function Button({
  label,
  outlined = false,
  enablePadding = true,
  icon,
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = [
    "button-container",
    outlined && "button-container--outline",
    enablePadding && "button-container--space",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
