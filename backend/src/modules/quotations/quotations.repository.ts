import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Quotation, QuotationDocument } from './schemas/quotation.schema';

@Injectable()
export class QuotationsRepository extends AbstractRepository<QuotationDocument> {
  constructor(
    @InjectModel(Quotation.name)
    quotationModel: Model<QuotationDocument>,
  ) {
    super(quotationModel);
  }
}
