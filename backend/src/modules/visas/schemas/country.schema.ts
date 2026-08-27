import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type CountryDocument = Country & Document;

@Schema(defaultSchemaOptions)
export class Country {
  @Prop({ required: true, trim: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ required: true, uppercase: true, trim: true, index: true })
  code: string;

  @Prop({ required: true, uppercase: true, trim: true, minlength: 2, maxlength: 2 })
  iso2: string;

  @Prop({ required: true, uppercase: true, trim: true, minlength: 3, maxlength: 3 })
  iso3: string;

  @Prop({ required: true, trim: true })
  flag: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ trim: true })
  continent?: string;

  @Prop({ type: Boolean, default: false, index: true })
  isPopular: boolean;

  @Prop({ type: Boolean, default: true, index: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0, index: true })
  sortOrder: number;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.index({ name: 'text', description: 'text' });
CountrySchema.index({ isActive: 1, isPopular: 1, sortOrder: 1 });
