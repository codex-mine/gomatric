import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { VisaTypesRepository } from '../repositories/visa-types.repository';
import { VisaType, VisaTypeDocument } from '../schemas/visa-type.schema';
import {
  CreateVisaTypeDto,
  UpdateVisaTypeDto,
  VisaTypeFilterDto,
} from '../dto/visa-type.dto';
import { PaginatedResult } from '../../../common/utils/pagination.util';

@Injectable()
export class VisaTypesService {
  constructor(private readonly visaTypesRepository: VisaTypesRepository) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(createDto: CreateVisaTypeDto): Promise<VisaTypeDocument> {
    const slug = createDto.slug ? this.slugify(createDto.slug) : this.slugify(createDto.name);

    const existing = await this.visaTypesRepository.findOne({
      $or: [{ slug }, { name: createDto.name.trim() }],
    });

    if (existing) {
      throw new ConflictException(
        `Visa type with slug "${slug}" or name "${createDto.name}" already exists`,
      );
    }

    return this.visaTypesRepository.create({
      ...createDto,
      name: createDto.name.trim(),
      slug,
    });
  }

  async findAll(filterDto: VisaTypeFilterDto): Promise<PaginatedResult<VisaTypeDocument>> {
    const filter: FilterQuery<VisaTypeDocument> = {};

    if (filterDto.isActive !== undefined) {
      filter.isActive = filterDto.isActive;
    }

    if (filterDto.category) {
      filter.category = filterDto.category;
    }

    if (filterDto.search) {
      filter.$or = [
        { name: { $regex: filterDto.search, $options: 'i' } },
        { description: { $regex: filterDto.search, $options: 'i' } },
      ];
    }

    return this.visaTypesRepository.findPaginated(filter, filterDto);
  }

  async findActive(): Promise<VisaTypeDocument[]> {
    return this.visaTypesRepository.find({ isActive: true }, undefined, {
      sort: { sortOrder: 1, name: 1 },
    });
  }

  async findById(id: string): Promise<VisaTypeDocument> {
    return this.visaTypesRepository.findByIdOrThrow(id);
  }

  async findBySlug(slug: string): Promise<VisaTypeDocument> {
    const visaType = await this.visaTypesRepository.findOne({
      slug: slug.toLowerCase().trim(),
    });
    if (!visaType) {
      throw new NotFoundException(`Visa type with slug "${slug}" not found`);
    }
    return visaType;
  }

  async update(id: string, updateDto: UpdateVisaTypeDto): Promise<VisaTypeDocument> {
    await this.visaTypesRepository.findByIdOrThrow(id);

    const updateData: Partial<VisaType> = { ...updateDto };

    if (updateDto.name && !updateDto.slug) {
      updateData.slug = this.slugify(updateDto.name);
    } else if (updateDto.slug) {
      updateData.slug = this.slugify(updateDto.slug);
    }

    if (updateData.slug) {
      const duplicate = await this.visaTypesRepository.findOne({
        _id: { $ne: id },
        slug: updateData.slug,
      });
      if (duplicate) {
        throw new ConflictException(`Visa type with slug "${updateData.slug}" already exists`);
      }
    }

    const updated = await this.visaTypesRepository.findByIdAndUpdate(id, updateData);
    if (!updated) {
      throw new NotFoundException(`Visa type with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<VisaTypeDocument> {
    const deleted = await this.visaTypesRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Visa type with ID ${id} not found`);
    }
    return deleted;
  }
}
