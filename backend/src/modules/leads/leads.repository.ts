import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Lead, LeadDocument } from './schemas/lead.schema';

@Injectable()
export class LeadsRepository extends AbstractRepository<LeadDocument> {
  constructor(
    @InjectModel(Lead.name)
    leadModel: Model<LeadDocument>,
  ) {
    super(leadModel);
  }
}
