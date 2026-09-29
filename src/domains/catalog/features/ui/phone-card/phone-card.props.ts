export type PhoneCardViewModel = {
  id?: string;
  imageUrl: string;
  brand?: string;
  labels?: string[];
  orientation?: "row" | "column";
  price: string;
};
