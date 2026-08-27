import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongoDoc, Schema as MongooseSchema } from 'mongoose';
import { DocumentType, VerificationStatus } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type DocumentRecord = DocumentItem & MongoDoc;

@Schema(defaultSchemaOptions)
export class DocumentItem {
  @Prop({ required: true, unique: true, uppercase: true, trim: true, index: true })
  documentNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true, index: true })
  customer: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  entityType: string;

  @Prop({ index: true })
  entityId?: string;

  @Prop({
    type: String,
    enum: DocumentType,
    default: DocumentType.OTHER,
    index: true,
  })
  documentType: DocumentType;

  @Prop({ required: true, trim: true })
  originalName: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop()
  fileKey?: string;

  @Prop({ type: Number })
  fileSize?: number;

  @Prop()
  mimeType?: string;

  @Prop({
    type: String,
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
    index: true,
  })
  verificationStatus: VerificationStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  verifiedBy?: MongooseSchema.Types.ObjectId;

  @Prop()
  expiryDate?: Date;

  @Prop()
  notes?: string;
}

export const DocumentItemSchema = SchemaFactory.createForClass(DocumentItem);
DocumentItemSchema.index({ customer: 1, documentType: 1 });
