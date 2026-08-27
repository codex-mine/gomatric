import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { VisaTypesService } from './visa-types.service';
import { VisaTypesRepository } from '../repositories/visa-types.repository';
import { VisaCategory } from '../enums/visa-service.enum';

describe('VisaTypesService', () => {
  let service: VisaTypesService;
  let repository: jest.Mocked<VisaTypesRepository>;

  const mockVisaType = {
    _id: '66a1b2c3d4e5f6a7b8c9d0e2',
    name: 'Tourist Visa',
    slug: 'tourist-visa',
    category: VisaCategory.TOURIST,
    description: 'Holiday travel',
    icon: 'compass',
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
        VisaTypesService,
        { provide: VisaTypesRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<VisaTypesService>(VisaTypesService);
    repository = module.get(VisaTypesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create visa type successfully', async () => {
      repository.findOne.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockVisaType as any);

      const result = await service.create({
        name: 'Tourist Visa',
        category: VisaCategory.TOURIST,
      });

      expect(result).toEqual(mockVisaType);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Tourist Visa',
          slug: 'tourist-visa',
          category: VisaCategory.TOURIST,
        }),
      );
    });

    it('should throw ConflictException if duplicate name or slug exists', async () => {
      repository.findOne.mockResolvedValue(mockVisaType as any);

      await expect(
        service.create({
          name: 'Tourist Visa',
          category: VisaCategory.TOURIST,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findBySlug', () => {
    it('should return visa type by slug', async () => {
      repository.findOne.mockResolvedValue(mockVisaType as any);

      const result = await service.findBySlug('tourist-visa');
      expect(result).toEqual(mockVisaType);
    });

    it('should throw NotFoundException when not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findBySlug('unknown-type')).rejects.toThrow(NotFoundException);
    });
  });
});
