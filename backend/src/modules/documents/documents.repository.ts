import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { DocumentItem, DocumentRecord } from './schemas/document.schema';

@Injectable()
export class DocumentsRepository extends AbstractRepository<DocumentRecord> {
  constructor(
    @InjectModel(DocumentItem.name)
    documentModel: Model<DocumentRecord>,
  ) {
    super(documentModel);
  }
}
