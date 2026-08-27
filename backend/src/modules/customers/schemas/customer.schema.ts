import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type CustomerDocument = Customer & Document;

@Schema(defaultSchemaOptions)
export class Customer {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  user?: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ trim: true, uppercase: true })
  passportNumber?: string;

  @Prop()
  passportExpiry?: Date;

  @Prop({ trim: true })
  nationality?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ enum: ['MALE', 'FEMALE', 'OTHER'] })
  gender?: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true })
  city?: string;

  @Prop({ trim: true })
  country?: string;

  @Prop({ type: Object })
  emergencyContact?: {
    name?: string;
    phone?: string;
    relationship?: string;
  };

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  notes?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.index({ email: 1, phone: 1 });
CustomerSchema.index({ passportNumber: 1 });
