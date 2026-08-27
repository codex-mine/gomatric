import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../common/constants/roles.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type UserDocument = User & Document;

@Schema(defaultSchemaOptions)
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ type: String, enum: Role, default: Role.CUSTOMER, index: true })
  role: Role;

  @Prop({ trim: true })
  phone?: string;

  @Prop()
  avatar?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  refreshTokenHash?: string;

  @Prop()
  lastLoginAt?: Date;

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1, role: 1 });
