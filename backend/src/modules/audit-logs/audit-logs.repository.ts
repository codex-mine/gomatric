import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';

@Injectable()
export class AuditLogsRepository extends AbstractRepository<AuditLogDocument> {
  constructor(
    @InjectModel(AuditLog.name)
    auditLogModel: Model<AuditLogDocument>,
  ) {
    super(auditLogModel);
  }
}
