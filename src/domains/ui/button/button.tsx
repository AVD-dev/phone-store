import "./button.scss";
import type { ButtonProps } from "./button.types";

export default function Button({
  label,
  outlined = false,
  enablePadding = true,
  icon,
}: ButtonProps) {
  const classes = [
    "button-container",
    outlined && "button-container--outline",
    enablePadding && "button-container--space",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type="button">
      {icon}
      {label}
    </button>
  );
}
