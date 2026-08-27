import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { QuotationStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type QuotationDocument = Quotation & Document;

@Schema()
export class QuotationItem {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: Number, required: true, min: 1, default: 1 })
  quantity: number;

  @Prop({ type: Number, required: true, min: 0 })
  unitPrice: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true, min: 0 })
  total: number;
}

export const QuotationItemSchema = SchemaFactory.createForClass(QuotationItem);

@Schema(defaultSchemaOptions)
export class Quotation {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  quotationNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Lead', index: true })
  lead?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customer: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service', index: true })
  service?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Destination' })
  destination?: MongooseSchema.Types.ObjectId;

  @Prop({ type: [QuotationItemSchema], required: true })
  items: QuotationItem[];

  @Prop({ type: Number, required: true, min: 0 })
  subtotal: number;

  @Prop({ type: Number, default: 0 })
  tax: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalAmount: number;

  @Prop({ default: 'BDT' })
  currency: string;

  @Prop({ trim: true })
  paymentTerms?: string;

  @Prop()
  expiryDate?: Date;

  @Prop({
    type: String,
    enum: QuotationStatus,
    default: QuotationStatus.DRAFT,
    index: true,
  })
  status: QuotationStatus;

  @Prop()
  notes?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy?: MongooseSchema.Types.ObjectId;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
QuotationSchema.index({ customer: 1, status: 1 });
