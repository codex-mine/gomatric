import type { Image } from "./common";

export interface VisaCountry {
  id: string;
  country: string;
  countryCode: string;
  slug: string;
  image: Image;
  visaTypes: VisaType[];
  popular: boolean;
}

export interface VisaType {
  id: string;
  name: string;
  slug: string;
  duration: string;
  processingTime: string;
  price: number;
  currency: string;
  description: string;
}

export interface VisaRequirement {
  id: string;
  country: string;
  visaType: string;
  documents: VisaDocument[];
  eligibility: string[];
  importantNotes: string[];
  applicationProcedure: string[];
}

export interface VisaDocument {
  name: string;
  description: string;
  required: boolean;
}

export type VisaApplicationStatus =
  | "submitted"
  | "documents_reviewing"
  | "documents_verified"
  | "processing"
  | "embassy_processing"
  | "approved"
  | "rejected"
  | "passport_ready"
  | "completed";

export interface VisaApplication {
  id: string;
  referenceNumber: string;
  country: string;
  visaType: string;
  status: VisaApplicationStatus;
  statusHistory: VisaStatusEntry[];
  appliedDate: string;
  estimatedCompletion?: string;
  customerName: string;
}

export interface VisaStatusEntry {
  status: VisaApplicationStatus;
  date: string;
  note?: string;
  completed: boolean;
}
