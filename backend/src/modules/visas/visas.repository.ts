import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { VisaApplication, VisaApplicationDocument } from './schemas/visa-application.schema';

@Injectable()
export class VisasRepository extends AbstractRepository<VisaApplicationDocument> {
  constructor(
    @InjectModel(VisaApplication.name)
    visaModel: Model<VisaApplicationDocument>,
  ) {
    super(visaModel);
  }
}
