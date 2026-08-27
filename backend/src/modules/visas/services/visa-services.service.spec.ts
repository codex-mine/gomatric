import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { VisaServicesService } from './visa-services.service';
import { VisaServicesRepository } from '../repositories/visa-services.repository';
import { CountriesRepository } from '../repositories/countries.repository';
import { VisaTypesRepository } from '../repositories/visa-types.repository';
import {
  ApplicantType,
  DocumentCategory,
  ProcessingTimeUnit,
  VisaCategory,
  VisaEntryType,
} from '../enums/visa-service.enum';

describe('VisaServicesService', () => {
  let service: VisaServicesService;
  let visaServicesRepo: jest.Mocked<VisaServicesRepository>;
  let countriesRepo: jest.Mocked<CountriesRepository>;
  let visaTypesRepo: jest.Mocked<VisaTypesRepository>;

  const mockCountryId = '66a1b2c3d4e5f6a7b8c9d0e1';
  const mockVisaTypeId = '66a1b2c3d4e5f6a7b8c9d0e2';
  const mockServiceId = '66a1b2c3d4e5f6a7b8c9d0e3';

  const mockCountry = {
    _id: mockCountryId,
    name: 'United Kingdom',
    slug: 'united-kingdom',
  };

  const mockVisaType = {
    _id: mockVisaTypeId,
    name: 'Tourist Visa',
    slug: 'tourist-visa',
    category: VisaCategory.TOURIST,
  };

  const mockVisaService = {
    _id: mockServiceId,
    country: mockCountry,
    visaType: mockVisaType,
    name: 'UK Standard Visitor Visa',
    slug: 'uk-standard-visitor-visa',
    shortDescription: '6-month UK visitor visa',
    description: 'Complete concierge service',
    validity: '6 Months',
    stayDuration: '180 Days',
    entryType: VisaEntryType.MULTIPLE,
    processingTime: { minDays: 10, maxDays: 15, unit: ProcessingTimeUnit.DAYS },
    fees: { government: 145, service: 55, total: 200, currency: 'USD' },
    documents: [
      {
        name: 'Passport',
        required: true,
        category: DocumentCategory.IDENTIFICATION,
        applicableFor: [ApplicantType.ALL],
      },
      {
        name: 'Employment NOC',
        required: true,
        category: DocumentCategory.EMPLOYMENT,
        applicableFor: [ApplicantType.EMPLOYED],
      },
      {
        name: 'Student ID',
        required: true,
        category: DocumentCategory.EMPLOYMENT,
        applicableFor: [ApplicantType.STUDENT],
      },
    ],
    isActive: true,
    isFeatured: true,
  };

  beforeEach(async () => {
    const mockServicesRepo = {
      create: jest.fn(),
      findOne: jest.fn(),
      findOneWithPopulate: jest.fn(),
      findWithPopulate: jest.fn(),
      paginateWithPopulate: jest.fn(),
      findById: jest.fn(),
      findByIdOrThrow: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const mockCountriesRepoInstance = {
      findById: jest.fn(),
      findOne: jest.fn(),
    };

    const mockVisaTypesRepoInstance = {
      findById: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisaServicesService,
        { provide: VisaServicesRepository, useValue: mockServicesRepo },
        { provide: CountriesRepository, useValue: mockCountriesRepoInstance },
        { provide: VisaTypesRepository, useValue: mockVisaTypesRepoInstance },
      ],
    }).compile();

    service = module.get<VisaServicesService>(VisaServicesService);
    visaServicesRepo = module.get(VisaServicesRepository);
    countriesRepo = module.get(CountriesRepository);
    visaTypesRepo = module.get(VisaTypesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create visa service with auto-computed total fee', async () => {
      countriesRepo.findById.mockResolvedValue(mockCountry as any);
      visaTypesRepo.findById.mockResolvedValue(mockVisaType as any);
      visaServicesRepo.findOne.mockResolvedValue(null);
      visaServicesRepo.create.mockResolvedValue({ _id: mockServiceId } as any);
      visaServicesRepo.findOneWithPopulate.mockResolvedValue(mockVisaService as any);

      const result = await service.create({
        countryId: mockCountryId,
        visaTypeId: mockVisaTypeId,
        name: 'UK Standard Visitor Visa',
        shortDescription: '6-month UK visitor visa',
        description: 'Complete concierge service',
        validity: '6 Months',
        stayDuration: '180 Days',
        entryType: VisaEntryType.MULTIPLE,
        processingTime: { minDays: 10, maxDays: 15, unit: ProcessingTimeUnit.DAYS },
        fees: { government: 145, service: 55, currency: 'USD' },
      });

      expect(result).toEqual(mockVisaService);
      expect(visaServicesRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'UK Standard Visitor Visa',
          fees: expect.objectContaining({ government: 145, service: 55, total: 200 }),
        }),
      );
    });

    it('should throw NotFoundException if country does not exist', async () => {
      countriesRepo.findById.mockResolvedValue(null);

      await expect(
        service.create({
          countryId: 'invalid-country',
          visaTypeId: mockVisaTypeId,
          name: 'Visa Service',
          shortDescription: 'Desc',
          description: 'Full desc',
          validity: '30 Days',
          stayDuration: '30 Days',
          entryType: VisaEntryType.SINGLE,
          processingTime: { minDays: 5, maxDays: 10, unit: ProcessingTimeUnit.DAYS },
          fees: { government: 100, service: 50, currency: 'USD' },
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBySlug', () => {
    it('should return populated visa service by slug', async () => {
      visaServicesRepo.findOneWithPopulate.mockResolvedValue(mockVisaService as any);

      const result = await service.findBySlug('uk-standard-visitor-visa');
      expect(result).toEqual(mockVisaService);
    });

    it('should throw NotFoundException when slug not found', async () => {
      visaServicesRepo.findOneWithPopulate.mockResolvedValue(null);

      await expect(service.findBySlug('unknown-slug')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getDocumentsForApplicant', () => {
    it('should filter documents specifically applicable to STUDENT', async () => {
      visaServicesRepo.findOneWithPopulate.mockResolvedValue(mockVisaService as any);

      const docs = await service.getDocumentsForApplicant(mockServiceId, ApplicantType.STUDENT);

      expect(docs).toHaveLength(2); // Passport (ALL) and Student ID (STUDENT)
      expect(docs.map((d) => d.name)).toEqual(['Passport', 'Student ID']);
    });
  });
});
