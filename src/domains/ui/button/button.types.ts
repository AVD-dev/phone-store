import type { ReactNode } from "react";

export interface ButtonProps {
  label: string;
  outlined?: boolean;
  enablePadding?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}
