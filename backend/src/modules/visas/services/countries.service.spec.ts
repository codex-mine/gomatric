import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesRepository } from '../repositories/countries.repository';

describe('CountriesService', () => {
  let service: CountriesService;
  let repository: jest.Mocked<CountriesRepository>;

  const mockCountry = {
    _id: '66a1b2c3d4e5f6a7b8c9d0e1',
    name: 'United Kingdom',
    slug: 'united-kingdom',
    code: 'GBR',
    iso2: 'GB',
    iso3: 'GBR',
    flag: '🇬🇧',
    description: 'UK Visas',
    continent: 'Europe',
    isPopular: true,
    isActive: true,
    sortOrder: 1,
  };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdOrThrow: jest.fn(),
      find: jest.fn(),
      paginate: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        { provide: CountriesRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    repository = module.get(CountriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a country successfully', async () => {
      repository.findOne.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockCountry as any);

      const result = await service.create({
        name: 'United Kingdom',
        code: 'GBR',
        iso2: 'GB',
        iso3: 'GBR',
        flag: '🇬🇧',
      });

      expect(result).toEqual(mockCountry);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'United Kingdom',
          slug: 'united-kingdom',
          code: 'GBR',
        }),
      );
    });

    it('should throw ConflictException if slug or code already exists', async () => {
      repository.findOne.mockResolvedValue(mockCountry as any);

      await expect(
        service.create({
          name: 'United Kingdom',
          code: 'GBR',
          iso2: 'GB',
          iso3: 'GBR',
          flag: '🇬🇧',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findBySlug', () => {
    it('should return country when found', async () => {
      repository.findOne.mockResolvedValue(mockCountry as any);

      const result = await service.findBySlug('united-kingdom');
      expect(result).toEqual(mockCountry);
    });

    it('should throw NotFoundException when country not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findBySlug('non-existing')).rejects.toThrow(NotFoundException);
    });
  });
});
