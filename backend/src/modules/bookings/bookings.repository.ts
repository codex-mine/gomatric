import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingsRepository extends AbstractRepository<BookingDocument> {
  constructor(
    @InjectModel(Booking.name)
    bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }
}
