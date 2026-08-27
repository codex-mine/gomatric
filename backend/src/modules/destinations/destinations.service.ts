import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DestinationsRepository } from './destinations.repository';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class DestinationsService {
  constructor(private readonly destinationsRepository: DestinationsRepository) {}

  async create(createDestinationDto: CreateDestinationDto) {
    const existing = await this.destinationsRepository.findOne({
      slug: createDestinationDto.slug.toLowerCase(),
    });
    if (existing) {
      throw new ConflictException('A destination with this slug already exists.');
    }
    return this.destinationsRepository.create({
      ...createDestinationDto,
      slug: createDestinationDto.slug.toLowerCase(),
    });
  }

  async findAll(paginationDto: PaginationDto, popularOnly = false) {
    const filter: any = {};
    if (popularOnly) {
      filter.popular = true;
    }
    if (paginationDto.search) {
      filter.$or = [
        { name: { $regex: paginationDto.search, $options: 'i' } },
        { country: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.destinationsRepository.findPaginated(filter, paginationDto);
  }

  async findFeatured() {
    return this.destinationsRepository.find({ isFeatured: true, isActive: true });
  }

  async findPopular() {
    return this.destinationsRepository.find({ popular: true, isActive: true });
  }

  async findBySlug(slug: string) {
    return this.destinationsRepository.findOneOrThrow({ slug: slug.toLowerCase() });
  }

  async findById(id: string) {
    return this.destinationsRepository.findByIdOrThrow(id);
  }

  async update(id: string, updateDestinationDto: UpdateDestinationDto) {
    if (updateDestinationDto.slug) {
      const existing = await this.destinationsRepository.findOne({
        slug: updateDestinationDto.slug.toLowerCase(),
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('A destination with this slug already exists.');
      }
      updateDestinationDto.slug = updateDestinationDto.slug.toLowerCase();
    }

    const updated = await this.destinationsRepository.findByIdAndUpdate(id, updateDestinationDto);
    if (!updated) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.destinationsRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    return { message: 'Destination deleted successfully' };
  }
}
