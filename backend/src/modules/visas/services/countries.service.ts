import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CountriesRepository } from '../repositories/countries.repository';
import { Country, CountryDocument } from '../schemas/country.schema';
import {
  CountryFilterDto,
  CreateCountryDto,
  UpdateCountryDto,
} from '../dto/country.dto';
import { PaginatedResult } from '../../../common/utils/pagination.util';

@Injectable()
export class CountriesService {
  constructor(private readonly countriesRepository: CountriesRepository) {}

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(createDto: CreateCountryDto): Promise<CountryDocument> {
    const slug = createDto.slug ? this.slugify(createDto.slug) : this.slugify(createDto.name);

    const existing = await this.countriesRepository.findOne({
      $or: [
        { slug },
        { code: createDto.code.toUpperCase() },
        { iso2: createDto.iso2.toUpperCase() },
        { iso3: createDto.iso3.toUpperCase() },
      ],
    });

    if (existing) {
      throw new ConflictException(
        `Country with slug "${slug}" or code "${createDto.code}" already exists`,
      );
    }

    return this.countriesRepository.create({
      ...createDto,
      name: createDto.name.trim(),
      slug,
      code: createDto.code.toUpperCase().trim(),
      iso2: createDto.iso2.toUpperCase().trim(),
      iso3: createDto.iso3.toUpperCase().trim(),
    });
  }

  async findAll(filterDto: CountryFilterDto): Promise<PaginatedResult<CountryDocument>> {
    const filter: FilterQuery<CountryDocument> = {};

    if (filterDto.isActive !== undefined) {
      filter.isActive = filterDto.isActive;
    }

    if (filterDto.isPopular !== undefined) {
      filter.isPopular = filterDto.isPopular;
    }

    if (filterDto.continent) {
      filter.continent = { $regex: filterDto.continent, $options: 'i' };
    }

    if (filterDto.search) {
      filter.$or = [
        { name: { $regex: filterDto.search, $options: 'i' } },
        { code: { $regex: filterDto.search, $options: 'i' } },
        { iso2: { $regex: filterDto.search, $options: 'i' } },
        { iso3: { $regex: filterDto.search, $options: 'i' } },
        { description: { $regex: filterDto.search, $options: 'i' } },
      ];
    }

    return this.countriesRepository.findPaginated(filter, filterDto);
  }

  async findActive(isPopular?: boolean): Promise<CountryDocument[]> {
    const filter: FilterQuery<CountryDocument> = { isActive: true };
    if (isPopular !== undefined) {
      filter.isPopular = isPopular;
    }
    return this.countriesRepository.find(filter, undefined, {
      sort: { sortOrder: 1, name: 1 },
    });
  }

  async findById(id: string): Promise<CountryDocument> {
    return this.countriesRepository.findByIdOrThrow(id);
  }

  async findBySlug(slug: string): Promise<CountryDocument> {
    const country = await this.countriesRepository.findOne({
      slug: slug.toLowerCase().trim(),
    });
    if (!country) {
      throw new NotFoundException(`Country with slug "${slug}" not found`);
    }
    return country;
  }

  async update(id: string, updateDto: UpdateCountryDto): Promise<CountryDocument> {
    await this.countriesRepository.findByIdOrThrow(id);

    const updateData: Partial<Country> = { ...updateDto };

    if (updateDto.name && !updateDto.slug) {
      updateData.slug = this.slugify(updateDto.name);
    } else if (updateDto.slug) {
      updateData.slug = this.slugify(updateDto.slug);
    }

    if (updateData.slug) {
      const duplicate = await this.countriesRepository.findOne({
        _id: { $ne: id },
        slug: updateData.slug,
      });
      if (duplicate) {
        throw new ConflictException(`Country with slug "${updateData.slug}" already exists`);
      }
    }

    if (updateDto.code) updateData.code = updateDto.code.toUpperCase().trim();
    if (updateDto.iso2) updateData.iso2 = updateDto.iso2.toUpperCase().trim();
    if (updateDto.iso3) updateData.iso3 = updateDto.iso3.toUpperCase().trim();

    const updated = await this.countriesRepository.findByIdAndUpdate(id, updateData);
    if (!updated) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<CountryDocument> {
    const deleted = await this.countriesRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return deleted;
  }
}
