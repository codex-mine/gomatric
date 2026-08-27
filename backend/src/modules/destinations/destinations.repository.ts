import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Destination, DestinationDocument } from './schemas/destination.schema';

@Injectable()
export class DestinationsRepository extends AbstractRepository<DestinationDocument> {
  constructor(
    @InjectModel(Destination.name)
    destinationModel: Model<DestinationDocument>,
  ) {
    super(destinationModel);
  }
}
