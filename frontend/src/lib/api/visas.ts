import { apiClient } from './client';

export type ApplicantType =
  | 'ALL'
  | 'ADULT'
  | 'MINOR'
  | 'EMPLOYED'
  | 'SELF_EMPLOYED'
  | 'STUDENT'
  | 'RETIRED'
  | 'SPONSORED'
  | 'UNEMPLOYED';

export interface Country {
  _id: string;
  name: string;
  slug: string;
  code: string;
  iso2: string;
  iso3: string;
  flag: string;
  description?: string;
  continent?: string;
  isPopular?: boolean;
  isActive: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface VisaType {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  sortOrder?: number;
}

export interface ProcessingTime {
  minDays: number;
  maxDays: number;
  unit: 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS';
  description?: string;
}

export interface VisaFeeBreakdown {
  name: string;
  amount: number;
  description?: string;
}

export interface VisaFees {
  government: number;
  service: number;
  total: number;
  currency: string;
  breakdown?: VisaFeeBreakdown[];
}

export interface StructuredDocument {
  name: string;
  description?: string;
  category:
    | 'IDENTIFICATION'
    | 'FINANCIAL'
    | 'EMPLOYMENT'
    | 'TRAVEL'
    | 'ACCOMMODATION'
    | 'SPONSORSHIP'
    | 'LEGAL'
    | 'OTHER';
  required: boolean;
  applicableFor: string[];
  instructions?: string;
  acceptedFormats?: string[];
  maxFileSizeMb?: number;
  sampleUrl?: string;
}

export interface VisaRequirements {
  financial?: {
    required: boolean;
    description?: string;
    minBalance?: number;
    statementsMonths?: number;
    sponsorAllowed?: boolean;
  };
  passport?: {
    minValidityMonths: number;
    blankPages: number;
    previousPassportsRequired?: boolean;
    description?: string;
  };
  photo?: {
    required: boolean;
    specification?: string;
    widthMm?: number;
    heightMm?: number;
    background?: string;
    recentMonths?: number;
  };
  travelInsurance?: {
    required: boolean;
    minCoverage?: number;
    currency?: string;
    description?: string;
  };
  accommodation?: {
    required: boolean;
    description?: string;
  };
  invitation?: {
    required: boolean;
    description?: string;
  };
  minor?: {
    required: boolean;
    parentConsentRequired?: boolean;
    birthCertificateRequired?: boolean;
    description?: string;
  };
  biometrics?: {
    required: boolean;
    description?: string;
    exemptions?: string[];
  };
  interview?: {
    required: boolean;
    description?: string;
    waiverEligible?: boolean;
  };
  appointment?: {
    required: boolean;
    bookingType?: string;
    description?: string;
  };
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
}

export interface VisaFaq {
  question: string;
  answer: string;
}

export interface VisaApplicationCenter {
  name: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  workingHours?: string;
}

export interface OptionalAgencyService {
  name: string;
  description?: string;
  fee: number;
  isDefault?: boolean;
}

export interface VisaService {
  _id: string;
  country: Country;
  visaType: VisaType;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  validity: string;
  stayDuration: string;
  entryType: 'SINGLE' | 'DOUBLE' | 'MULTIPLE';
  processingTime: ProcessingTime;
  recommendedApplyBefore?: string;
  fees: VisaFees;
  eligibility: string[];
  prerequisites: string[];
  documents: StructuredDocument[];
  requirements: VisaRequirements;
  applicationSteps: ApplicationStep[];
  importantNotes: string[];
  faqs: VisaFaq[];
  officialUrl?: string;
  applicationCenter?: VisaApplicationCenter;
  optionalServices: OptionalAgencyService[];
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface VisaServiceFilterParams {
  countryId?: string;
  visaTypeId?: string;
  countrySlug?: string;
  visaTypeSlug?: string;
  entryType?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const visasApi = {
  // Countries
  async getActiveCountries(isPopular?: boolean): Promise<Country[]> {
    const query = isPopular !== undefined ? `?isPopular=${isPopular}` : '';
    const res = await apiClient.get<any>(`/countries/active${query}`);
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  },

  async getCountryBySlug(slug: string): Promise<Country> {
    const res = await apiClient.get<any>(`/countries/slug/${encodeURIComponent(slug)}`);
    if (res && typeof res === 'object' && 'data' in res && !Array.isArray(res.data)) {
      return res.data as Country;
    }
    return res as Country;
  },

  // Visa Types
  async getActiveVisaTypes(): Promise<VisaType[]> {
    const res = await apiClient.get<any>('/visa-types/active');
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  },

  async getVisaTypeBySlug(slug: string): Promise<VisaType> {
    const res = await apiClient.get<any>(`/visa-types/slug/${encodeURIComponent(slug)}`);
    if (res && typeof res === 'object' && 'data' in res && !Array.isArray(res.data)) {
      return res.data as VisaType;
    }
    return res as VisaType;
  },

  // Visa Services
  async getVisaServices(
    params: VisaServiceFilterParams = {}
  ): Promise<PaginatedResult<VisaService>> {
    const searchParams = new URLSearchParams();

    if (params.countryId) searchParams.set('countryId', params.countryId);
    if (params.visaTypeId) searchParams.set('visaTypeId', params.visaTypeId);
    if (params.countrySlug) searchParams.set('countrySlug', params.countrySlug);
    if (params.visaTypeSlug) searchParams.set('visaTypeSlug', params.visaTypeSlug);
    if (params.entryType) searchParams.set('entryType', params.entryType);
    if (params.isFeatured !== undefined)
      searchParams.set('isFeatured', String(params.isFeatured));
    if (params.isActive !== undefined)
      searchParams.set('isActive', String(params.isActive));
    if (params.search) searchParams.set('search', params.search);
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params.page) searchParams.set('page', String(params.page));
    if (params.limit) searchParams.set('limit', String(params.limit));

    const queryString = searchParams.toString();
    const res = await apiClient.get<any>(
      `/visa-services${queryString ? `?${queryString}` : ''}`
    );

    if (Array.isArray(res)) {
      return {
        data: res,
        meta: {
          total: res.length,
          page: 1,
          limit: res.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    if (res && Array.isArray(res.data)) {
      return res as PaginatedResult<VisaService>;
    }

    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: params.limit || 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  },

  async getFeaturedVisaServices(): Promise<VisaService[]> {
    const res = await apiClient.get<any>('/visa-services/featured');
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  },

  async getVisaServicesByCountry(countrySlug: string): Promise<VisaService[]> {
    const res = await apiClient.get<any>(
      `/visa-services/country/${encodeURIComponent(countrySlug)}`
    );
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  },

  async getVisaServiceBySlug(slug: string): Promise<VisaService> {
    const cleanSlug = slug.trim();
    try {
      const res = await apiClient.get<any>(
        `/visa-services/slug/${encodeURIComponent(cleanSlug)}`
      );
      if (res && typeof res === 'object' && 'data' in res && !Array.isArray(res.data)) {
        return res.data as VisaService;
      }
      if (res && res._id) {
        return res as VisaService;
      }
    } catch (err: any) {
      // If 404 and looks like an ObjectId, attempt fetch by ID
      if (/^[0-9a-fA-F]{24}$/.test(cleanSlug)) {
        const idRes = await apiClient.get<any>(
          `/visa-services/${encodeURIComponent(cleanSlug)}`
        );
        if (idRes && typeof idRes === 'object' && 'data' in idRes && !Array.isArray(idRes.data)) {
          return idRes.data as VisaService;
        }
        return idRes as VisaService;
      }

      // If it's a country slug (e.g. united-kingdom), fetch country's first visa service
      try {
        const countryServices = await apiClient.get<any>(
          `/visa-services/country/${encodeURIComponent(cleanSlug)}`
        );
        const list = Array.isArray(countryServices)
          ? countryServices
          : countryServices?.data || [];
        if (list.length > 0) {
          return list[0] as VisaService;
        }
      } catch {}

      throw err;
    }

    throw new Error(`Visa service not found for slug ${slug}`);
  },

  async getVisaServiceById(id: string): Promise<VisaService> {
    const res = await apiClient.get<any>(`/visa-services/${encodeURIComponent(id)}`);
    if (res && typeof res === 'object' && 'data' in res && !Array.isArray(res.data)) {
      return res.data as VisaService;
    }
    return res as VisaService;
  },

  async getApplicantDocuments(
    id: string,
    applicantType?: string
  ): Promise<StructuredDocument[]> {
    const query = applicantType ? `?applicantType=${applicantType}` : '';
    const res = await apiClient.get<any>(
      `/visa-services/${encodeURIComponent(id)}/documents${query}`
    );
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    return [];
  },
};
