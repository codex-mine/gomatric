import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AuditAction, Role } from '../../../common/constants';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type AuditLogDocument = AuditLog & Document;

@Schema(defaultSchemaOptions)
export class AuditLog {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  actor?: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
  actorRole?: Role;

  @Prop({ type: String })
  actorEmail?: string;

  @Prop({ type: String, enum: AuditAction, required: true, index: true })
  action: AuditAction;

  @Prop({ type: String, required: true, index: true })
  resource: string;

  @Prop({ type: String, index: true })
  resourceId?: string;

  @Prop({ type: String })
  ipAddress?: string;

  @Prop({ type: String })
  userAgent?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  metadata?: Record<string, any>;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ createdAt: -1 });
