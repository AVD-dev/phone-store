import "./button.scss";
import type { ButtonProps } from "./button.types";

export default function Button({
  label,
  icon,
  disabled = false,
  variant = "filled",
  severity = "default",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = [
    "button-container",
    `button-container--${variant}`,
    `button-container--${severity}`,
    className,
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
