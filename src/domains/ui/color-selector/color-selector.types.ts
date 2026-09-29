export interface ColorOption {
  id: string;
  value: string;
}

export interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor?: string;
  onChange: (color: string) => void;
}
