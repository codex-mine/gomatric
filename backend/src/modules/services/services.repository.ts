import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Service, ServiceDocument } from './schemas/service.schema';

@Injectable()
export class ServicesRepository extends AbstractRepository<ServiceDocument> {
  constructor(
    @InjectModel(Service.name)
    serviceModel: Model<ServiceDocument>,
  ) {
    super(serviceModel);
  }
}
