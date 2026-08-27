import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';
import { VisaCategory } from '../enums/visa-service.enum';

export type VisaTypeDocument = VisaType & Document;

@Schema(defaultSchemaOptions)
export class VisaType {
  @Prop({ required: true, trim: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({
    type: String,
    enum: VisaCategory,
    default: VisaCategory.TOURIST,
    index: true,
  })
  category: VisaCategory;

  @Prop({ trim: true })
  description?: string;

  @Prop({ trim: true })
  icon?: string;

  @Prop({ type: Boolean, default: true, index: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0, index: true })
  sortOrder: number;
}

export const VisaTypeSchema = SchemaFactory.createForClass(VisaType);

VisaTypeSchema.index({ name: 'text', description: 'text' });
VisaTypeSchema.index({ isActive: 1, category: 1, sortOrder: 1 });
