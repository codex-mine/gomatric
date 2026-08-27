import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { VisasRepository } from './visas.repository';
import {
  CreateVisaApplicationDto,
  UpdateVisaApplicationDto,
  UpdateVisaStatusDto,
} from './dto/visa-application.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction, VisaApplicationStatus } from '../../common/constants/status.enum';

@Injectable()
export class VisasService {
  constructor(
    private readonly visasRepository: VisasRepository,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  private generateApplicationNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-VISA-${timestamp}-${random}`;
  }

  async create(createVisaDto: CreateVisaApplicationDto, actorId?: string) {
    const applicationNumber = this.generateApplicationNumber();
    const payload: any = {
      ...createVisaDto,
      applicationNumber,
      customer: new Types.ObjectId(createVisaDto.customer),
      status: VisaApplicationStatus.SUBMITTED,
      statusHistory: [
        {
          status: VisaApplicationStatus.SUBMITTED,
          changedAt: new Date(),
          changedBy: actorId ? new Types.ObjectId(actorId) : undefined,
          remarks: 'Application submitted',
        },
      ],
    };

    if (createVisaDto.assignedAgent) {
      payload.assignedAgent = new Types.ObjectId(createVisaDto.assignedAgent);
    }

    const application = await this.visasRepository.create(payload);

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.APPLICATION_CREATED,
      resource: 'VisaApplication',
      resourceId: (application as any).id,
      metadata: { applicationNumber, country: createVisaDto.country },
    });

    return application;
  }

  async findAll(paginationDto: PaginationDto, status?: VisaApplicationStatus, customerId?: string) {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (customerId) {
      filter.customer = new Types.ObjectId(customerId);
    }
    if (paginationDto.search) {
      filter.$or = [
        { applicationNumber: { $regex: paginationDto.search, $options: 'i' } },
        { country: { $regex: paginationDto.search, $options: 'i' } },
        { visaType: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.visasRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone passportNumber' },
      { path: 'assignedAgent', select: 'name email' },
      { path: 'documents' },
    ]);
  }

  async findById(id: string) {
    const app = await this.visasRepository.findById(id, undefined, {
      populate: [
        { path: 'customer' },
        { path: 'assignedAgent', select: 'name email' },
        { path: 'documents' },
      ],
    });
    if (!app) {
      throw new NotFoundException(`Visa application with ID ${id} not found`);
    }
    return app;
  }

  async findByApplicationNumber(applicationNumber: string) {
    return this.visasRepository.findOneOrThrow(
      { applicationNumber: applicationNumber.toUpperCase() },
      undefined,
      {
        populate: [{ path: 'customer', select: 'name email phone' }, { path: 'documents' }],
      },
    );
  }

  async updateStatus(id: string, dto: UpdateVisaStatusDto, actorId?: string) {
    const application = await this.visasRepository.findByIdOrThrow(id);

    const historyEntry = {
      status: dto.status,
      changedAt: new Date(),
      changedBy: actorId ? new Types.ObjectId(actorId) : undefined,
      remarks: dto.remarks || '',
    };

    const updated = await this.visasRepository.findByIdAndUpdate(id, {
      status: dto.status,
      $push: { statusHistory: historyEntry },
    });

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.APPLICATION_STATUS_CHANGED,
      resource: 'VisaApplication',
      resourceId: id,
      metadata: {
        applicationNumber: application.applicationNumber,
        oldStatus: application.status,
        newStatus: dto.status,
      },
    });

    return updated;
  }

  async update(id: string, updateVisaDto: UpdateVisaApplicationDto, actorId?: string) {
    const payload: any = { ...updateVisaDto };
    if (updateVisaDto.customer) {
      payload.customer = new Types.ObjectId(updateVisaDto.customer);
    }
    if (updateVisaDto.assignedAgent) {
      payload.assignedAgent = new Types.ObjectId(updateVisaDto.assignedAgent);
    }

    const updated = await this.visasRepository.findByIdAndUpdate(id, payload);
    if (!updated) {
      throw new NotFoundException(`Visa application with ID ${id} not found`);
    }

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.APPLICATION_UPDATED,
      resource: 'VisaApplication',
      resourceId: id,
    });

    return updated;
  }
}
