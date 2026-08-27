import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { LeadsRepository } from './leads.repository';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { LeadStatus } from '../../common/constants/status.enum';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  private generateLeadNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-LEAD-${timestamp}-${random}`;
  }

  async create(createLeadDto: CreateLeadDto) {
    const leadNumber = this.generateLeadNumber();
    const payload: any = {
      ...createLeadDto,
      leadNumber,
    };

    if (createLeadDto.customer) {
      payload.customer = new Types.ObjectId(createLeadDto.customer);
    }
    if (createLeadDto.service) {
      payload.service = new Types.ObjectId(createLeadDto.service);
    }
    if (createLeadDto.destination) {
      payload.destination = new Types.ObjectId(createLeadDto.destination);
    }

    return this.leadsRepository.create(payload);
  }

  async findAll(paginationDto: PaginationDto, status?: LeadStatus, assignedAgent?: string) {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (assignedAgent) {
      filter.assignedAgent = new Types.ObjectId(assignedAgent);
    }
    if (paginationDto.search) {
      filter.$or = [
        { leadNumber: { $regex: paginationDto.search, $options: 'i' } },
        { 'contactInfo.name': { $regex: paginationDto.search, $options: 'i' } },
        { 'contactInfo.email': { $regex: paginationDto.search, $options: 'i' } },
        { 'contactInfo.phone': { $regex: paginationDto.search, $options: 'i' } },
      ];
    }

    return this.leadsRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone' },
      { path: 'service', select: 'name category slug' },
      { path: 'destination', select: 'name country slug' },
      { path: 'assignedAgent', select: 'name email' },
    ]);
  }

  async findById(id: string) {
    return this.leadsRepository.findByIdOrThrow(id, undefined, {
      populate: [
        { path: 'customer' },
        { path: 'service' },
        { path: 'destination' },
        { path: 'assignedAgent', select: 'name email' },
      ],
    });
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const payload: any = { ...updateLeadDto };
    if (updateLeadDto.assignedAgent) {
      payload.assignedAgent = new Types.ObjectId(updateLeadDto.assignedAgent);
    }

    const updated = await this.leadsRepository.findByIdAndUpdate(id, payload);
    if (!updated) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.leadsRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return { message: 'Lead deleted successfully' };
  }
}
