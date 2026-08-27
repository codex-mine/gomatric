import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { BookingsRepository } from './bookings.repository';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/booking.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction, BookingStatus, PaymentStatus } from '../../common/constants/status.enum';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  private generateBookingNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `GM-BKG-${timestamp}-${random}`;
  }

  async create(createBookingDto: CreateBookingDto, actorId?: string) {
    const bookingNumber = this.generateBookingNumber();
    const payload: any = {
      ...createBookingDto,
      bookingNumber,
      customer: new Types.ObjectId(createBookingDto.customer),
      bookingStatus: createBookingDto.bookingStatus || BookingStatus.PENDING,
      paymentStatus: createBookingDto.paymentStatus || PaymentStatus.PENDING,
    };

    if (createBookingDto.quotation) {
      payload.quotation = new Types.ObjectId(createBookingDto.quotation);
    }
    if (createBookingDto.service) {
      payload.service = new Types.ObjectId(createBookingDto.service);
    }
    if (createBookingDto.destination) {
      payload.destination = new Types.ObjectId(createBookingDto.destination);
    }
    if (createBookingDto.assignedAgent) {
      payload.assignedAgent = new Types.ObjectId(createBookingDto.assignedAgent);
    }

    const booking = await this.bookingsRepository.create(payload);

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.BOOKING_CREATED,
      resource: 'Booking',
      resourceId: (booking as any).id,
      metadata: { bookingNumber, totalAmount: createBookingDto.totalAmount },
    });

    return booking;
  }

  async findAll(
    paginationDto: PaginationDto,
    status?: BookingStatus,
    paymentStatus?: PaymentStatus,
    customerId?: string,
  ) {
    const filter: any = {};
    if (status) {
      filter.bookingStatus = status;
    }
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }
    if (customerId) {
      filter.customer = new Types.ObjectId(customerId);
    }
    if (paginationDto.search) {
      filter.$or = [
        { bookingNumber: { $regex: paginationDto.search, $options: 'i' } },
        { notes: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }

    return this.bookingsRepository.findPaginated(filter, paginationDto, [
      { path: 'customer', select: 'name email phone' },
      { path: 'service', select: 'name category' },
      { path: 'destination', select: 'name country' },
      { path: 'assignedAgent', select: 'name email' },
    ]);
  }

  async findById(id: string) {
    return this.bookingsRepository.findByIdOrThrow(id, undefined, {
      populate: [
        { path: 'customer' },
        { path: 'service' },
        { path: 'destination' },
        { path: 'quotation' },
        { path: 'assignedAgent', select: 'name email' },
      ],
    });
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto, actorId?: string) {
    const booking = await this.bookingsRepository.findByIdOrThrow(id);
    const updated = await this.bookingsRepository.findByIdAndUpdate(id, dto);

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.BOOKING_STATUS_CHANGED,
      resource: 'Booking',
      resourceId: id,
      metadata: {
        bookingNumber: booking.bookingNumber,
        oldBookingStatus: booking.bookingStatus,
        newBookingStatus: dto.bookingStatus,
        oldPaymentStatus: booking.paymentStatus,
        newPaymentStatus: dto.paymentStatus,
      },
    });

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.bookingsRepository.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return { message: 'Booking deleted successfully' };
  }
}
