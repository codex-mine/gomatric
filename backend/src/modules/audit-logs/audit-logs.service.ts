import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { AuditLogsRepository } from './audit-logs.repository';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class AuditLogsService {
  private readonly logger = new Logger(AuditLogsService.name);

  constructor(private readonly auditLogsRepository: AuditLogsRepository) {}

  async log(dto: CreateAuditLogDto) {
    try {
      const payload: any = {
        ...dto,
        actor: dto.actor ? new Types.ObjectId(dto.actor) : undefined,
      };
      return await this.auditLogsRepository.create(payload);
    } catch (err: any) {
      this.logger.error(`Failed to record audit log: ${err.message}`, err.stack);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const filter: any = {};
    if (paginationDto.search) {
      filter.$or = [
        { action: { $regex: paginationDto.search, $options: 'i' } },
        { resource: { $regex: paginationDto.search, $options: 'i' } },
        { actorEmail: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.auditLogsRepository.findPaginated(filter, paginationDto, {
      path: 'actor',
      select: 'name email role',
    });
  }

  async findByResource(resource: string, resourceId?: string) {
    const filter: any = { resource };
    if (resourceId) {
      filter.resourceId = resourceId;
    }
    return this.auditLogsRepository.find(filter);
  }
}
