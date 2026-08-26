export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  order: number;
}

export type FAQCategory =
  | "visa"
  | "tours"
  | "bookings"
  | "payments"
  | "documents"
  | "travel"
  | "general";
