export interface ColorOption {
  id: string;
  value: string;
  name: string;
  imageUrl: string;
}

export interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor?: string;
  onChange: (color: ColorOption) => void;
}
