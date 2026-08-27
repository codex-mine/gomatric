import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { VisaApplicationStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type VisaApplicationDocument = VisaApplication & Document;

@Schema(defaultSchemaOptions)
export class VisaApplication {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  applicationNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customer: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  country: string;

  @Prop({ required: true, trim: true })
  visaType: string;

  @Prop({
    type: String,
    enum: VisaApplicationStatus,
    default: VisaApplicationStatus.SUBMITTED,
    index: true,
  })
  status: VisaApplicationStatus;

  @Prop()
  travelDate?: Date;

  @Prop()
  returnDate?: Date;

  @Prop({ type: Number, default: 1 })
  travelersCount: number;

  @Prop({ type: Object })
  applicantDetails?: {
    fullName: string;
    passportNumber: string;
    passportExpiry?: Date;
    dateOfBirth?: Date;
    nationality?: string;
    gender?: string;
    email?: string;
    phone?: string;
  };

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Document' }])
  documents: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  assignedAgent?: MongooseSchema.Types.ObjectId;

  @Prop()
  notes?: string;

  @Prop({ type: [Object], default: [] })
  statusHistory: Array<{
    status: VisaApplicationStatus;
    changedAt: Date;
    changedBy?: MongooseSchema.Types.ObjectId;
    remarks?: string;
  }>;
}

export const VisaApplicationSchema = SchemaFactory.createForClass(VisaApplication);
VisaApplicationSchema.index({ customer: 1, status: 1 });
