import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction, PaymentStatus } from '../../common/constants/status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  private generatePaymentNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-PAY-${timestamp}-${random}`;
  }

  async create(createPaymentDto: CreatePaymentDto, actorId?: string) {
    const paymentNumber = this.generatePaymentNumber();
    const payload: any = {
      ...createPaymentDto,
      paymentNumber,
      customer: new Types.ObjectId(createPaymentDto.customer),
      recordedBy: actorId ? new Types.ObjectId(actorId) : undefined,
    };

    if (createPaymentDto.booking) {
      payload.booking = new Types.ObjectId(createPaymentDto.booking);
    }
    if (createPaymentDto.quotation) {
      payload.quotation = new Types.ObjectId(createPaymentDto.quotation);
    }

    const payment = await this.paymentsRepository.create(payload);

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.PAYMENT_RECORDED,
      resource: 'Payment',
      resourceId: (payment as any).id,
      metadata: { paymentNumber, amount: createPaymentDto.amount },
    });

    return payment;
  }

  async findAll(paginationDto: PaginationDto, customerId?: string, status?: PaymentStatus) {
    const filter: any = {};
    if (customerId) {
      filter.customer = new Types.ObjectId(customerId);
    }
    if (status) {
      filter.paymentStatus = status;
    }
    if (paginationDto.search) {
      filter.$or = [
        { paymentNumber: { $regex: paginationDto.search, $options: 'i' } },
        { transactionId: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }

    return this.paymentsRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone' },
      { path: 'booking', select: 'bookingNumber totalAmount' },
      { path: 'recordedBy', select: 'name email' },
    ]);
  }

  async findById(id: string) {
    return this.paymentsRepository.findByIdOrThrow(id, undefined, {
      populate: [
        { path: 'customer' },
        { path: 'booking' },
        { path: 'quotation' },
        { path: 'recordedBy', select: 'name email' },
      ],
    });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto, actorId?: string) {
    const updated = await this.paymentsRepository.findByIdAndUpdate(id, updatePaymentDto);
    if (!updated) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.PAYMENT_UPDATED,
      resource: 'Payment',
      resourceId: id,
      metadata: updatePaymentDto,
    });

    return updated;
  }
}
