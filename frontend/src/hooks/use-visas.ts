import { useQuery } from '@tanstack/react-query';
import {
  visasApi,
  Country,
  VisaType,
  VisaService,
  VisaServiceFilterParams,
  PaginatedResult,
  StructuredDocument,
} from '@/lib/api/visas';

export function useActiveCountries(isPopular?: boolean) {
  return useQuery<Country[]>({
    queryKey: ['countries', 'active', isPopular],
    queryFn: () => visasApi.getActiveCountries(isPopular),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}

export function useCountryBySlug(slug?: string) {
  return useQuery<Country>({
    queryKey: ['countries', 'slug', slug],
    queryFn: () => visasApi.getCountryBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  });
}

export function useActiveVisaTypes() {
  return useQuery<VisaType[]>({
    queryKey: ['visa-types', 'active'],
    queryFn: () => visasApi.getActiveVisaTypes(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useVisaServices(params: VisaServiceFilterParams = {}) {
  return useQuery<PaginatedResult<VisaService>>({
    queryKey: ['visa-services', params],
    queryFn: () => visasApi.getVisaServices(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useFeaturedVisaServices() {
  return useQuery<VisaService[]>({
    queryKey: ['visa-services', 'featured'],
    queryFn: () => visasApi.getFeaturedVisaServices(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useVisaServicesByCountry(countrySlug?: string) {
  return useQuery<VisaService[]>({
    queryKey: ['visa-services', 'country', countrySlug],
    queryFn: () => visasApi.getVisaServicesByCountry(countrySlug!),
    enabled: !!countrySlug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useVisaServiceBySlug(slug?: string) {
  return useQuery<VisaService>({
    queryKey: ['visa-services', 'slug', slug],
    queryFn: () => visasApi.getVisaServiceBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useApplicantDocuments(
  serviceId?: string,
  applicantType?: string
) {
  return useQuery<StructuredDocument[]>({
    queryKey: ['visa-services', serviceId, 'documents', applicantType],
    queryFn: () => visasApi.getApplicantDocuments(serviceId!, applicantType),
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 5,
  });
}
