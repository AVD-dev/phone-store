export interface PhoneCardProps {
  id: string;
  imageUrl: string;
  brand?: string;
  labels?: string[];
  price: string;
  orientation: "row" | "column";
}
