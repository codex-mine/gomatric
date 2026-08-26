export type BookingStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "partial"
  | "paid"
  | "refunded"
  | "failed";

export interface Booking {
  id: string;
  referenceNumber: string;
  service: string;
  destination: string;
  customerName: string;
  travelers: BookingTraveler[];
  bookingDate: string;
  travelDate: string;
  totalAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  assignedAgent?: string;
}

export interface BookingTraveler {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
}

export interface BookingFormData {
  destination: string;
  travelDate: string;
  returnDate?: string;
  travelers: number;
  service: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialRequirements?: string;
}

export interface ApplicationStatusStep {
  label: string;
  description?: string;
  date?: string;
  completed: boolean;
  current: boolean;
}
