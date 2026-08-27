import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { AbstractRepository } from '../../../database/abstract.repository';
import { VisaService, VisaServiceDocument } from '../schemas/visa-service.schema';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginatedResult } from '../../../common/utils/pagination.util';

export const VISA_SERVICE_DEFAULT_POPULATE: PopulateOptions[] = [
  { path: 'country', select: 'name slug code iso2 iso3 flag continent isActive isPopular' },
  { path: 'visaType', select: 'name slug category description icon isActive' },
];

@Injectable()
export class VisaServicesRepository extends AbstractRepository<VisaServiceDocument> {
  constructor(
    @InjectModel(VisaService.name)
    visaServiceModel: Model<VisaServiceDocument>,
  ) {
    super(visaServiceModel);
  }

  async findWithPopulate(
    filterQuery: FilterQuery<VisaServiceDocument>,
    populate: PopulateOptions[] = VISA_SERVICE_DEFAULT_POPULATE,
  ): Promise<VisaServiceDocument[]> {
    return this.model
      .find(filterQuery)
      .populate(populate)
      .sort({ sortOrder: 1, createdAt: -1 })
      .exec();
  }

  async findOneWithPopulate(
    filterQuery: FilterQuery<VisaServiceDocument>,
    populate: PopulateOptions[] = VISA_SERVICE_DEFAULT_POPULATE,
  ): Promise<VisaServiceDocument | null> {
    return this.model.findOne(filterQuery).populate(populate).exec();
  }

  async paginateWithPopulate(
    filterQuery: FilterQuery<VisaServiceDocument>,
    paginationDto: PaginationDto,
    populate: PopulateOptions[] = VISA_SERVICE_DEFAULT_POPULATE,
  ): Promise<PaginatedResult<VisaServiceDocument>> {
    return this.findPaginated(filterQuery, paginationDto, populate);
  }
}
