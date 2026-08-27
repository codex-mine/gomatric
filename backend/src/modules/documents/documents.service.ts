import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { DocumentsRepository } from './documents.repository';
import { CreateDocumentDto, UpdateDocumentVerificationDto } from './dto/document.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction, DocumentType, VerificationStatus } from '../../common/constants/status.enum';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  private generateDocumentNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-DOC-${timestamp}-${random}`;
  }

  async create(createDocumentDto: CreateDocumentDto, actorId?: string) {
    const documentNumber = this.generateDocumentNumber();
    const payload: any = {
      ...createDocumentDto,
      documentNumber,
      customer: new Types.ObjectId(createDocumentDto.customer),
      verificationStatus: VerificationStatus.PENDING,
    };

    const doc = await this.documentsRepository.create(payload);

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.DOCUMENT_UPLOADED,
      resource: 'Document',
      resourceId: (doc as any).id,
      metadata: { documentNumber, type: createDocumentDto.documentType },
    });

    return doc;
  }

  async findAll(
    paginationDto: PaginationDto,
    customerId?: string,
    documentType?: DocumentType,
    verificationStatus?: VerificationStatus,
  ) {
    const filter: any = {};
    if (customerId) {
      filter.customer = new Types.ObjectId(customerId);
    }
    if (documentType) {
      filter.documentType = documentType;
    }
    if (verificationStatus) {
      filter.verificationStatus = verificationStatus;
    }
    if (paginationDto.search) {
      filter.$or = [
        { documentNumber: { $regex: paginationDto.search, $options: 'i' } },
        { originalName: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }

    return this.documentsRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone' },
      { path: 'verifiedBy', select: 'name email' },
    ]);
  }

  async findById(id: string) {
    return this.documentsRepository.findByIdOrThrow(id, undefined, {
      populate: [{ path: 'customer' }, { path: 'verifiedBy', select: 'name email' }],
    });
  }

  async updateVerification(id: string, dto: UpdateDocumentVerificationDto, verifierId: string) {
    const updated = await this.documentsRepository.findByIdAndUpdate(id, {
      verificationStatus: dto.verificationStatus,
      verifiedBy: new Types.ObjectId(verifierId),
      notes: dto.notes,
    });

    if (!updated) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    await this.auditLogsService.log({
      actor: verifierId,
      action: AuditAction.DOCUMENT_VERIFIED,
      resource: 'Document',
      resourceId: id,
      metadata: { verificationStatus: dto.verificationStatus },
    });

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.documentsRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return { message: 'Document deleted successfully' };
  }
}
