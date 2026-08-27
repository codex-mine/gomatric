import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { QuotationsRepository } from './quotations.repository';
import { CreateQuotationDto, UpdateQuotationStatusDto } from './dto/quotation.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { QuotationStatus } from '../../common/constants/status.enum';

@Injectable()
export class QuotationsService {
  constructor(private readonly quotationsRepository: QuotationsRepository) {}

  private generateQuotationNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-QTN-${timestamp}-${random}`;
  }

  async create(createQuotationDto: CreateQuotationDto, creatorId?: string) {
    const quotationNumber = this.generateQuotationNumber();
    const payload: any = {
      ...createQuotationDto,
      quotationNumber,
      customer: new Types.ObjectId(createQuotationDto.customer),
      createdBy: creatorId ? new Types.ObjectId(creatorId) : undefined,
    };

    if (createQuotationDto.lead) {
      payload.lead = new Types.ObjectId(createQuotationDto.lead);
    }
    if (createQuotationDto.service) {
      payload.service = new Types.ObjectId(createQuotationDto.service);
    }
    if (createQuotationDto.destination) {
      payload.destination = new Types.ObjectId(createQuotationDto.destination);
    }

    return this.quotationsRepository.create(payload);
  }

  async findAll(paginationDto: PaginationDto, customerId?: string, status?: QuotationStatus) {
    const filter: any = {};
    if (customerId) {
      filter.customer = new Types.ObjectId(customerId);
    }
    if (status) {
      filter.status = status;
    }
    if (paginationDto.search) {
      filter.$or = [
        { quotationNumber: { $regex: paginationDto.search, $options: 'i' } },
        { notes: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }

    return this.quotationsRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone' },
      { path: 'service', select: 'name category' },
      { path: 'destination', select: 'name country' },
      { path: 'createdBy', select: 'name email' },
    ]);
  }

  async findById(id: string) {
    return this.quotationsRepository.findByIdOrThrow(id, undefined, {
      populate: [
        { path: 'customer' },
        { path: 'service' },
        { path: 'destination' },
        { path: 'lead' },
        { path: 'createdBy', select: 'name email' },
      ],
    });
  }

  async updateStatus(id: string, dto: UpdateQuotationStatusDto) {
    const updated = await this.quotationsRepository.findByIdAndUpdate(id, {
      status: dto.status,
    });
    if (!updated) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.quotationsRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return { message: 'Quotation deleted successfully' };
  }
}
