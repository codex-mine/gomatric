import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { VisaServicesRepository } from '../repositories/visa-services.repository';
import { CountriesRepository } from '../repositories/countries.repository';
import { VisaTypesRepository } from '../repositories/visa-types.repository';
import { VisaService, VisaServiceDocument } from '../schemas/visa-service.schema';
import {
  CreateVisaServiceDto,
  UpdateVisaServiceDto,
  VisaServiceFilterDto,
} from '../dto/visa-service.dto';
import { ApplicantType } from '../enums/visa-service.enum';
import { PaginatedResult } from '../../../common/utils/pagination.util';

@Injectable()
export class VisaServicesService {
  constructor(
    private readonly visaServicesRepository: VisaServicesRepository,
    private readonly countriesRepository: CountriesRepository,
    private readonly visaTypesRepository: VisaTypesRepository,
  ) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(createDto: CreateVisaServiceDto): Promise<VisaServiceDocument> {
    // Validate country existence
    const country = await this.countriesRepository.findById(createDto.countryId);
    if (!country) {
      throw new NotFoundException(`Country with ID "${createDto.countryId}" not found`);
    }

    // Validate visa type existence
    const visaType = await this.visaTypesRepository.findById(createDto.visaTypeId);
    if (!visaType) {
      throw new NotFoundException(`Visa Type with ID "${createDto.visaTypeId}" not found`);
    }

    const slug = createDto.slug
      ? this.slugify(createDto.slug)
      : this.slugify(`${country.name}-${createDto.name}`);

    const existing = await this.visaServicesRepository.findOne({ slug });
    if (existing) {
      throw new ConflictException(`Visa service with slug "${slug}" already exists`);
    }

    // Compute total fee if omitted
    const governmentFee = createDto.fees.government || 0;
    const serviceFee = createDto.fees.service || 0;
    const totalFee =
      createDto.fees.total !== undefined ? createDto.fees.total : governmentFee + serviceFee;

    const feesConfig = {
      ...createDto.fees,
      government: governmentFee,
      service: serviceFee,
      total: totalFee,
    };

    const created = await this.visaServicesRepository.create({
      ...createDto,
      country: new Types.ObjectId(createDto.countryId),
      visaType: new Types.ObjectId(createDto.visaTypeId),
      name: createDto.name.trim(),
      slug,
      fees: feesConfig,
    });

    return this.findById(created._id.toString());
  }

  async findAll(filterDto: VisaServiceFilterDto): Promise<PaginatedResult<VisaServiceDocument>> {
    const filter: FilterQuery<VisaServiceDocument> = {};

    if (filterDto.isActive !== undefined) {
      filter.isActive = filterDto.isActive;
    }

    if (filterDto.isFeatured !== undefined) {
      filter.isFeatured = filterDto.isFeatured;
    }

    if (filterDto.entryType) {
      filter.entryType = filterDto.entryType;
    }

    if (filterDto.countryId) {
      filter.country = new Types.ObjectId(filterDto.countryId);
    } else if (filterDto.countrySlug) {
      const country = await this.countriesRepository.findOne({
        slug: filterDto.countrySlug.toLowerCase().trim(),
      });
      if (country) {
        filter.country = country._id;
      } else {
        // Return empty paginated set
        return {
          data: [],
          meta: { total: 0, page: 1, limit: filterDto.limit || 10, totalPages: 0, hasNextPage: false, hasPreviousPage: false },
        };
      }
    }

    if (filterDto.visaTypeId) {
      filter.visaType = new Types.ObjectId(filterDto.visaTypeId);
    } else if (filterDto.visaTypeSlug) {
      const visaType = await this.visaTypesRepository.findOne({
        slug: filterDto.visaTypeSlug.toLowerCase().trim(),
      });
      if (visaType) {
        filter.visaType = visaType._id;
      } else {
        return {
          data: [],
          meta: { total: 0, page: 1, limit: filterDto.limit || 10, totalPages: 0, hasNextPage: false, hasPreviousPage: false },
        };
      }
    }

    if (filterDto.search) {
      filter.$or = [
        { name: { $regex: filterDto.search, $options: 'i' } },
        { shortDescription: { $regex: filterDto.search, $options: 'i' } },
        { description: { $regex: filterDto.search, $options: 'i' } },
        { validity: { $regex: filterDto.search, $options: 'i' } },
      ];
    }

    return this.visaServicesRepository.paginateWithPopulate(filter, filterDto);
  }

  async findFeatured(): Promise<VisaServiceDocument[]> {
    return this.visaServicesRepository.findWithPopulate({
      isActive: true,
      isFeatured: true,
    });
  }

  async findByCountrySlug(countrySlug: string): Promise<VisaServiceDocument[]> {
    const country = await this.countriesRepository.findOne({
      slug: countrySlug.toLowerCase().trim(),
    });
    if (!country) {
      throw new NotFoundException(`Country with slug "${countrySlug}" not found`);
    }

    return this.visaServicesRepository.findWithPopulate({
      country: country._id,
      isActive: true,
    });
  }

  async findById(id: string): Promise<VisaServiceDocument> {
    const visaService = await this.visaServicesRepository.findOneWithPopulate({
      _id: new Types.ObjectId(id),
    });
    if (!visaService) {
      throw new NotFoundException(`Visa service with ID "${id}" not found`);
    }
    return visaService;
  }

  async findBySlug(slug: string): Promise<VisaServiceDocument> {
    const cleanSlug = slug.toLowerCase().trim();
    let visaService = await this.visaServicesRepository.findOneWithPopulate({
      slug: cleanSlug,
    });

    if (!visaService) {
      visaService = await this.visaServicesRepository.findOneWithPopulate({
        slug: { $regex: new RegExp(`^${cleanSlug}$`, 'i') },
      });
    }

    if (!visaService && Types.ObjectId.isValid(cleanSlug)) {
      visaService = await this.visaServicesRepository.findOneWithPopulate({
        _id: new Types.ObjectId(cleanSlug),
      });
    }

    if (!visaService) {
      const country = await this.countriesRepository.findOne({
        slug: cleanSlug,
      });
      if (country) {
        visaService = await this.visaServicesRepository.findOneWithPopulate({
          country: country._id,
          isActive: true,
        });
      }
    }

    if (!visaService) {
      throw new NotFoundException(`Visa service with slug "${slug}" not found`);
    }
    return visaService;
  }

  async update(id: string, updateDto: UpdateVisaServiceDto): Promise<VisaServiceDocument> {
    const existing = await this.visaServicesRepository.findByIdOrThrow(id);

    const updateData: any = { ...updateDto };

    if (updateDto.countryId) {
      const country = await this.countriesRepository.findById(updateDto.countryId);
      if (!country) {
        throw new NotFoundException(`Country with ID "${updateDto.countryId}" not found`);
      }
      updateData.country = new Types.ObjectId(updateDto.countryId);
      delete updateData.countryId;
    }

    if (updateDto.visaTypeId) {
      const visaType = await this.visaTypesRepository.findById(updateDto.visaTypeId);
      if (!visaType) {
        throw new NotFoundException(`Visa Type with ID "${updateDto.visaTypeId}" not found`);
      }
      updateData.visaType = new Types.ObjectId(updateDto.visaTypeId);
      delete updateData.visaTypeId;
    }

    if (updateDto.name && !updateDto.slug) {
      updateData.slug = this.slugify(updateDto.name);
    } else if (updateDto.slug) {
      updateData.slug = this.slugify(updateDto.slug);
    }

    if (updateData.slug) {
      const duplicate = await this.visaServicesRepository.findOne({
        _id: { $ne: id },
        slug: updateData.slug,
      });
      if (duplicate) {
        throw new ConflictException(`Visa service with slug "${updateData.slug}" already exists`);
      }
    }

    if (updateDto.fees) {
      const governmentFee =
        updateDto.fees.government !== undefined
          ? updateDto.fees.government
          : existing.fees.government;
      const serviceFee =
        updateDto.fees.service !== undefined ? updateDto.fees.service : existing.fees.service;
      const totalFee =
        updateDto.fees.total !== undefined
          ? updateDto.fees.total
          : governmentFee + serviceFee;

      updateData.fees = {
        ...existing.fees,
        ...updateDto.fees,
        government: governmentFee,
        service: serviceFee,
        total: totalFee,
      };
    }

    await this.visaServicesRepository.findByIdAndUpdate(id, updateData);
    return this.findById(id);
  }

  async remove(id: string): Promise<VisaServiceDocument> {
    const deleted = await this.visaServicesRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Visa service with ID "${id}" not found`);
    }
    return deleted;
  }

  async getDocumentsForApplicant(
    id: string,
    applicantType: ApplicantType = ApplicantType.ALL,
  ): Promise<any[]> {
    const service = await this.findById(id);
    if (!service.documents || service.documents.length === 0) {
      return [];
    }

    if (applicantType === ApplicantType.ALL) {
      return service.documents;
    }

    return service.documents.filter(
      (doc) =>
        doc.applicableFor?.includes(ApplicantType.ALL) ||
        doc.applicableFor?.includes(applicantType),
    );
  }
}
