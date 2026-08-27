import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BookingStatus, PaymentStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type BookingDocument = Booking & Document;

@Schema(defaultSchemaOptions)
export class Booking {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  bookingNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quotation', index: true })
  quotation?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customer: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service', index: true })
  service?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Destination' })
  destination?: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  travelersCount: number;

  @Prop()
  travelDate?: Date;

  @Prop()
  returnDate?: Date;

  @Prop({ type: Number, required: true, min: 0 })
  totalAmount: number;

  @Prop({ default: 'BDT' })
  currency: string;

  @Prop({
    type: String,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
    index: true,
  })
  bookingStatus: BookingStatus;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    index: true,
  })
  paymentStatus: PaymentStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  assignedAgent?: MongooseSchema.Types.ObjectId;

  @Prop()
  notes?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.index({ customer: 1, bookingStatus: 1 });
BookingSchema.index({ paymentStatus: 1 });
