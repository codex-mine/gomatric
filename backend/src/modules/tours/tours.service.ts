import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ToursRepository } from './tours.repository';
import { CreateTourPackageDto, UpdateTourPackageDto } from './dto/tour-package.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ToursService {
  constructor(private readonly toursRepository: ToursRepository) {}

  async create(createTourDto: CreateTourPackageDto) {
    const existing = await this.toursRepository.findOne({
      slug: createTourDto.slug.toLowerCase(),
    });
    if (existing) {
      throw new ConflictException('A tour package with this slug already exists.');
    }

    return this.toursRepository.create({
      ...createTourDto,
      slug: createTourDto.slug.toLowerCase(),
      destination: new Types.ObjectId(createTourDto.destination),
    });
  }

  async findAll(paginationDto: PaginationDto, destinationId?: string, isFeatured?: boolean) {
    const filter: any = {};
    if (destinationId) {
      filter.destination = new Types.ObjectId(destinationId);
    }
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured;
    }
    if (paginationDto.search) {
      filter.$or = [
        { title: { $regex: paginationDto.search, $options: 'i' } },
        { shortDescription: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.toursRepository.findPaginated(filter, paginationDto, {
      path: 'destination',
      select: 'name country slug coverImage',
    });
  }

  async findFeatured() {
    return this.toursRepository.find({ isFeatured: true, isActive: true }, undefined, {
      populate: { path: 'destination', select: 'name country slug' },
    });
  }

  async findBySlug(slug: string) {
    return this.toursRepository.findOneOrThrow({ slug: slug.toLowerCase() }, undefined, {
      populate: { path: 'destination' },
    });
  }

  async findById(id: string) {
    return this.toursRepository.findByIdOrThrow(id, undefined, {
      populate: { path: 'destination' },
    });
  }

  async update(id: string, updateTourDto: UpdateTourPackageDto) {
    if (updateTourDto.slug) {
      const existing = await this.toursRepository.findOne({
        slug: updateTourDto.slug.toLowerCase(),
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('A tour package with this slug already exists.');
      }
      updateTourDto.slug = updateTourDto.slug.toLowerCase();
    }

    const payload: any = { ...updateTourDto };
    if (updateTourDto.destination) {
      payload.destination = new Types.ObjectId(updateTourDto.destination);
    }

    const updated = await this.toursRepository.findByIdAndUpdate(id, payload);
    if (!updated) {
      throw new NotFoundException(`Tour package with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.toursRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Tour package with ID ${id} not found`);
    }
    return { message: 'Tour package deleted successfully' };
  }
}
