import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PaymentMethod, PaymentStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type PaymentDocument = Payment & Document;

@Schema(defaultSchemaOptions)
export class Payment {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  paymentNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booking', index: true })
  booking?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quotation', index: true })
  quotation?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customer: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ default: 'BDT' })
  currency: string;

  @Prop({
    type: String,
    enum: PaymentMethod,
    default: PaymentMethod.BANK_TRANSFER,
  })
  paymentMethod: PaymentMethod;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    index: true,
  })
  paymentStatus: PaymentStatus;

  @Prop({ trim: true })
  transactionId?: string;

  @Prop()
  receiptUrl?: string;

  @Prop()
  notes?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  recordedBy?: MongooseSchema.Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ customer: 1, paymentStatus: 1 });
PaymentSchema.index({ transactionId: 1 });
