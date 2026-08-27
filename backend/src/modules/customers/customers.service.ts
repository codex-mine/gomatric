import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const payload: any = { ...createCustomerDto };
    if (createCustomerDto.user) {
      payload.user = new Types.ObjectId(createCustomerDto.user);
    }
    return this.customersRepository.create(payload);
  }

  async findAll(paginationDto: PaginationDto) {
    const filter: any = {};
    if (paginationDto.search) {
      filter.$or = [
        { name: { $regex: paginationDto.search, $options: 'i' } },
        { email: { $regex: paginationDto.search, $options: 'i' } },
        { phone: { $regex: paginationDto.search, $options: 'i' } },
        { passportNumber: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.customersRepository.findPaginated(filter, paginationDto, {
      path: 'user',
      select: 'name email role',
    });
  }

  async findById(id: string) {
    return this.customersRepository.findByIdOrThrow(id);
  }

  async findByUserId(userId: string) {
    return this.customersRepository.findOne({ user: new Types.ObjectId(userId) });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const payload: any = { ...updateCustomerDto };
    if (updateCustomerDto.user) {
      payload.user = new Types.ObjectId(updateCustomerDto.user);
    }

    const updated = await this.customersRepository.findByIdAndUpdate(id, payload);
    if (!updated) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.customersRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return { message: 'Customer deleted successfully' };
  }
}
