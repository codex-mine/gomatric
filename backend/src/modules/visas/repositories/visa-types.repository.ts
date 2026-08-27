import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../../database/abstract.repository';
import { VisaType, VisaTypeDocument } from '../schemas/visa-type.schema';

@Injectable()
export class VisaTypesRepository extends AbstractRepository<VisaTypeDocument> {
  constructor(
    @InjectModel(VisaType.name)
    visaTypeModel: Model<VisaTypeDocument>,
  ) {
    super(visaTypeModel);
  }
}
