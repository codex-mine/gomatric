import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { TourPackage, TourPackageDocument } from './schemas/tour-package.schema';

@Injectable()
export class ToursRepository extends AbstractRepository<TourPackageDocument> {
  constructor(
    @InjectModel(TourPackage.name)
    tourModel: Model<TourPackageDocument>,
  ) {
    super(tourModel);
  }
}
