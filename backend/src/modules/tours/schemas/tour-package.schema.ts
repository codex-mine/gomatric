import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';

export type TourPackageDocument = TourPackage & Document;

@Schema()
export class ItineraryDay {
  @Prop({ required: true })
  day: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ type: [String], default: [] })
  meals: string[];

  @Prop({ type: [String], default: [] })
  activities: string[];
}

export const ItineraryDaySchema = SchemaFactory.createForClass(ItineraryDay);

@Schema(defaultSchemaOptions)
export class TourPackage {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Destination', required: true, index: true })
  destination: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 1 })
  durationDays: number;

  @Prop({ type: Number, required: true, min: 0 })
  durationNights: number;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number })
  discountPrice?: number;

  @Prop({ trim: true })
  shortDescription?: string;

  @Prop()
  featuredImage?: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop({ type: [String], default: [] })
  includes: string[];

  @Prop({ type: [String], default: [] })
  excludes: string[];

  @Prop({ type: [ItineraryDaySchema], default: [] })
  itinerary: ItineraryDay[];

  @Prop({ type: Number, default: 20 })
  maxGroupSize: number;

  @Prop({ default: true, index: true })
  isActive: boolean;

  @Prop({ default: false, index: true })
  isFeatured: boolean;
}

export const TourPackageSchema = SchemaFactory.createForClass(TourPackage);
TourPackageSchema.index({ destination: 1, isActive: 1 });
TourPackageSchema.index({ price: 1 });
