import type { ReactNode } from "react";

export interface ButtonProps {
  label: string;
  className?: string;
  icon?: ReactNode;
  variant?: "filled" | "outlined" | "ghost";
  disabled?: boolean;
  severity?: "default" | "danger";
  onClick: () => void;
}
