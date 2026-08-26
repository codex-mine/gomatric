export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  destination?: string;
  service?: string;
  travelDate?: string;
  message: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  whatsapp?: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
