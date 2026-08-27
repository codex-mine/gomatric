import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServiceCategory } from '../../../common/constants/status.enum';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type ServiceDocument = Service & Document;

@Schema(defaultSchemaOptions)
export class Service {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ type: String, enum: ServiceCategory, default: ServiceCategory.CUSTOM, index: true })
  category: ServiceCategory;

  @Prop({ required: true, trim: true })
  shortDescription: string;

  @Prop({ trim: true })
  fullDescription?: string;

  @Prop()
  icon?: string;

  @Prop()
  coverImage?: string;

  @Prop({ type: Number, default: 0 })
  startingPrice: number;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  order: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
ServiceSchema.index({ category: 1, isActive: 1 });
