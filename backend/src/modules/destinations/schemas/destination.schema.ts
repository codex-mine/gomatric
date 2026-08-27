import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type DestinationDocument = Destination & Document;

@Schema(defaultSchemaOptions)
export class Destination {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ required: true, trim: true })
  country: string;

  @Prop({ trim: true, uppercase: true })
  countryCode?: string;

  @Prop({ trim: true })
  description?: string;

  @Prop()
  coverImage?: string;

  @Prop({ type: [String], default: [] })
  galleryImages: string[];

  @Prop({ default: false, index: true })
  popular: boolean;

  @Prop({ default: false, index: true })
  isFeatured: boolean;

  @Prop({ type: Number, default: 0 })
  startingPrice: number;

  @Prop({ default: true, index: true })
  isActive: boolean;
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
DestinationSchema.index({ country: 1, isActive: 1 });
