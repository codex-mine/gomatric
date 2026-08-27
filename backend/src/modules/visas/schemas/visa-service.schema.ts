import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { defaultSchemaOptions } from '../../../common/utils/schema.util';
import {
  ApplicantType,
  AppointmentBookingType,
  DocumentCategory,
  ProcessingTimeUnit,
  VisaEntryType,
} from '../enums/visa-service.enum';

export type VisaServiceDocument = VisaService & Document;

@Schema({ _id: false })
export class ProcessingTimeConfig {
  @Prop({ required: true, type: Number })
  minDays: number;

  @Prop({ required: true, type: Number })
  maxDays: number;

  @Prop({
    type: String,
    enum: ProcessingTimeUnit,
    default: ProcessingTimeUnit.DAYS,
  })
  unit: ProcessingTimeUnit;

  @Prop({ trim: true })
  description?: string;
}

export const ProcessingTimeConfigSchema = SchemaFactory.createForClass(ProcessingTimeConfig);

@Schema({ _id: false })
export class VisaFeeBreakdown {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop({ trim: true })
  description?: string;
}

export const VisaFeeBreakdownSchema = SchemaFactory.createForClass(VisaFeeBreakdown);

@Schema({ _id: false })
export class VisaFeesConfig {
  @Prop({ required: true, type: Number, default: 0 })
  government: number;

  @Prop({ required: true, type: Number, default: 0 })
  service: number;

  @Prop({ required: true, type: Number, default: 0 })
  total: number;

  @Prop({ required: true, uppercase: true, trim: true, default: 'USD' })
  currency: string;

  @Prop({ type: [VisaFeeBreakdownSchema], default: [] })
  breakdown?: VisaFeeBreakdown[];
}

export const VisaFeesConfigSchema = SchemaFactory.createForClass(VisaFeesConfig);

@Schema({ _id: false })
export class StructuredDocumentRequirement {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({
    type: String,
    enum: DocumentCategory,
    default: DocumentCategory.IDENTIFICATION,
  })
  category: DocumentCategory;

  @Prop({ type: Boolean, default: true })
  required: boolean;

  @Prop({
    type: [String],
    enum: ApplicantType,
    default: [ApplicantType.ALL],
  })
  applicableFor: ApplicantType[];

  @Prop({ trim: true })
  instructions?: string;

  @Prop({ type: [String], default: ['PDF', 'JPG', 'PNG'] })
  acceptedFormats?: string[];

  @Prop({ type: Number, default: 10 })
  maxFileSizeMb?: number;

  @Prop({ trim: true })
  sampleUrl?: string;
}

export const StructuredDocumentRequirementSchema = SchemaFactory.createForClass(
  StructuredDocumentRequirement,
);

@Schema({ _id: false })
export class VisaSpecificRequirements {
  @Prop({
    type: {
      required: { type: Boolean, default: false },
      description: { type: String, trim: true },
      minBalance: { type: Number },
      statementsMonths: { type: Number },
      sponsorAllowed: { type: Boolean, default: true },
    },
    default: {},
  })
  financial?: {
    required: boolean;
    description?: string;
    minBalance?: number;
    statementsMonths?: number;
    sponsorAllowed?: boolean;
  };

  @Prop({
    type: {
      minValidityMonths: { type: Number, default: 6 },
      blankPages: { type: Number, default: 2 },
      previousPassportsRequired: { type: Boolean, default: false },
      description: { type: String, trim: true },
    },
    default: { minValidityMonths: 6, blankPages: 2 },
  })
  passport?: {
    minValidityMonths: number;
    blankPages: number;
    previousPassportsRequired?: boolean;
    description?: string;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: true },
      specification: { type: String, trim: true },
      widthMm: { type: Number },
      heightMm: { type: Number },
      background: { type: String, default: 'White' },
      recentMonths: { type: Number, default: 6 },
    },
    default: { required: true, background: 'White', recentMonths: 6 },
  })
  photo?: {
    required: boolean;
    specification?: string;
    widthMm?: number;
    heightMm?: number;
    background?: string;
    recentMonths?: number;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      minCoverage: { type: Number },
      currency: { type: String, default: 'USD' },
      description: { type: String, trim: true },
    },
    default: {},
  })
  travelInsurance?: {
    required: boolean;
    minCoverage?: number;
    currency?: string;
    description?: string;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      description: { type: String, trim: true },
    },
    default: {},
  })
  accommodation?: {
    required: boolean;
    description?: string;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      description: { type: String, trim: true },
    },
    default: {},
  })
  invitation?: {
    required: boolean;
    description?: string;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      parentConsentRequired: { type: Boolean, default: false },
      birthCertificateRequired: { type: Boolean, default: false },
      description: { type: String, trim: true },
    },
    default: {},
  })
  minor?: {
    required: boolean;
    parentConsentRequired?: boolean;
    birthCertificateRequired?: boolean;
    description?: string;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      description: { type: String, trim: true },
      exemptions: { type: [String], default: [] },
    },
    default: { required: false },
  })
  biometrics?: {
    required: boolean;
    description?: string;
    exemptions?: string[];
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      description: { type: String, trim: true },
      waiverEligible: { type: Boolean, default: false },
    },
    default: { required: false },
  })
  interview?: {
    required: boolean;
    description?: string;
    waiverEligible?: boolean;
  };

  @Prop({
    type: {
      required: { type: Boolean, default: false },
      bookingType: {
        type: String,
        enum: AppointmentBookingType,
        default: AppointmentBookingType.NOT_REQUIRED,
      },
      description: { type: String, trim: true },
    },
    default: { required: false, bookingType: AppointmentBookingType.NOT_REQUIRED },
  })
  appointment?: {
    required: boolean;
    bookingType?: AppointmentBookingType;
    description?: string;
  };
}

export const VisaSpecificRequirementsSchema = SchemaFactory.createForClass(
  VisaSpecificRequirements,
);

@Schema({ _id: false })
export class ApplicationStep {
  @Prop({ required: true, type: Number })
  stepNumber: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  estimatedTime?: string;
}

export const ApplicationStepSchema = SchemaFactory.createForClass(ApplicationStep);

@Schema({ _id: false })
export class VisaFaq {
  @Prop({ required: true, trim: true })
  question: string;

  @Prop({ required: true, trim: true })
  answer: string;
}

export const VisaFaqSchema = SchemaFactory.createForClass(VisaFaq);

@Schema({ _id: false })
export class VisaApplicationCenter {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true })
  website?: string;

  @Prop({ trim: true })
  email?: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ trim: true })
  workingHours?: string;
}

export const VisaApplicationCenterSchema = SchemaFactory.createForClass(VisaApplicationCenter);

@Schema({ _id: false })
export class OptionalAgencyService {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ required: true, type: Number })
  fee: number;

  @Prop({ type: Boolean, default: false })
  isDefault?: boolean;
}

export const OptionalAgencyServiceSchema = SchemaFactory.createForClass(OptionalAgencyService);

@Schema(defaultSchemaOptions)
export class VisaService {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Country', required: true, index: true })
  country: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'VisaType', required: true, index: true })
  visaType: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  slug: string;

  @Prop({ required: true, trim: true })
  shortDescription: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  validity: string;

  @Prop({ required: true, trim: true })
  stayDuration: string;

  @Prop({
    type: String,
    enum: VisaEntryType,
    default: VisaEntryType.SINGLE,
    index: true,
  })
  entryType: VisaEntryType;

  @Prop({ type: ProcessingTimeConfigSchema, required: true })
  processingTime: ProcessingTimeConfig;

  @Prop({ trim: true })
  recommendedApplyBefore?: string;

  @Prop({ type: VisaFeesConfigSchema, required: true })
  fees: VisaFeesConfig;

  @Prop({ type: [String], default: [] })
  eligibility: string[];

  @Prop({ type: [String], default: [] })
  prerequisites: string[];

  @Prop({ type: [StructuredDocumentRequirementSchema], default: [] })
  documents: StructuredDocumentRequirement[];

  @Prop({ type: VisaSpecificRequirementsSchema, default: () => ({}) })
  requirements: VisaSpecificRequirements;

  @Prop({ type: [ApplicationStepSchema], default: [] })
  applicationSteps: ApplicationStep[];

  @Prop({ type: [String], default: [] })
  importantNotes: string[];

  @Prop({ type: [VisaFaqSchema], default: [] })
  faqs: VisaFaq[];

  @Prop({ trim: true })
  officialUrl?: string;

  @Prop({ type: VisaApplicationCenterSchema })
  applicationCenter?: VisaApplicationCenter;

  @Prop({ type: [OptionalAgencyServiceSchema], default: [] })
  optionalServices: OptionalAgencyService[];

  @Prop({ type: Boolean, default: false, index: true })
  isFeatured: boolean;

  @Prop({ type: Boolean, default: true, index: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0, index: true })
  sortOrder: number;
}

export const VisaServiceSchema = SchemaFactory.createForClass(VisaService);

VisaServiceSchema.index({ name: 'text', shortDescription: 'text', description: 'text' });
VisaServiceSchema.index({ country: 1, visaType: 1, isActive: 1 });
VisaServiceSchema.index({ isActive: 1, isFeatured: 1, sortOrder: 1 });
