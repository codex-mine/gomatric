import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { LeadPriority, LeadStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type LeadDocument = Lead & Document;

@Schema(defaultSchemaOptions)
export class Lead {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  leadNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', index: true })
  customer?: MongooseSchema.Types.ObjectId;

  @Prop({ type: Object })
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service', index: true })
  service?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Destination', index: true })
  destination?: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: LeadStatus, default: LeadStatus.NEW, index: true })
  status: LeadStatus;

  @Prop({ type: String, enum: LeadPriority, default: LeadPriority.MEDIUM })
  priority: LeadPriority;

  @Prop({ default: 'WEBSITE' })
  source: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  assignedAgent?: MongooseSchema.Types.ObjectId;

  @Prop()
  message?: string;

  @Prop()
  notes?: string;

  @Prop()
  followUpDate?: Date;

  @Prop({ type: Object })
  requirements?: Record<string, any>;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
LeadSchema.index({ status: 1, priority: 1 });
