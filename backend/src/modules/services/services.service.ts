import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async create(createServiceDto: CreateServiceDto) {
    const existing = await this.servicesRepository.findOne({
      slug: createServiceDto.slug.toLowerCase(),
    });
    if (existing) {
      throw new ConflictException('A service with this slug already exists.');
    }
    return this.servicesRepository.create({
      ...createServiceDto,
      slug: createServiceDto.slug.toLowerCase(),
    });
  }

  async findAll(paginationDto: PaginationDto, category?: string) {
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    if (paginationDto.search) {
      filter.$or = [
        { name: { $regex: paginationDto.search, $options: 'i' } },
        { shortDescription: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.servicesRepository.findPaginated(filter, paginationDto);
  }

  async findActive() {
    return this.servicesRepository.find({ isActive: true });
  }

  async findBySlug(slug: string) {
    return this.servicesRepository.findOneOrThrow({ slug: slug.toLowerCase() });
  }

  async findById(id: string) {
    return this.servicesRepository.findByIdOrThrow(id);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    if (updateServiceDto.slug) {
      const existing = await this.servicesRepository.findOne({
        slug: updateServiceDto.slug.toLowerCase(),
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('A service with this slug already exists.');
      }
      updateServiceDto.slug = updateServiceDto.slug.toLowerCase();
    }

    const updated = await this.servicesRepository.findByIdAndUpdate(id, updateServiceDto);
    if (!updated) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.servicesRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return { message: 'Service deleted successfully' };
  }
}
