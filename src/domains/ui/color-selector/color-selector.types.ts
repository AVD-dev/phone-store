export interface ColorOption {
  id: string;
  value: string;
  imageUrl: string;
}

export interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor?: string;
  onChange: (color: ColorOption) => void;
}
