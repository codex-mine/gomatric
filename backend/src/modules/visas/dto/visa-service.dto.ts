import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ApplicantType,
  AppointmentBookingType,
  DocumentCategory,
  ProcessingTimeUnit,
  VisaEntryType,
} from '../enums/visa-service.enum';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class ProcessingTimeDto {
  @ApiProperty({ example: 10, description: 'Minimum processing duration' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minDays: number;

  @ApiProperty({ example: 15, description: 'Maximum processing duration' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxDays: number;

  @ApiProperty({
    enum: ProcessingTimeUnit,
    example: ProcessingTimeUnit.DAYS,
    default: ProcessingTimeUnit.DAYS,
  })
  @IsNotEmpty()
  @IsEnum(ProcessingTimeUnit)
  unit: ProcessingTimeUnit;

  @ApiPropertyOptional({ example: '10-15 working days following biometrics submission' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaFeeBreakdownDto {
  @ApiProperty({ example: 'Embassy Processing Fee' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 135 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @ApiPropertyOptional({ example: 'Non-refundable official UKVI visa fee' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaFeesDto {
  @ApiProperty({ example: 135, description: 'Government/Embassy visa fee' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  government: number;

  @ApiProperty({ example: 50, description: 'Agency consultation & documentation fee' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  service: number;

  @ApiPropertyOptional({
    example: 185,
    description: 'Total estimated cost (auto-calculated if omitted)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  total?: number;

  @ApiProperty({ example: 'USD', default: 'USD' })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiPropertyOptional({ type: [VisaFeeBreakdownDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VisaFeeBreakdownDto)
  breakdown?: VisaFeeBreakdownDto[];
}

export class StructuredDocumentRequirementDto {
  @ApiProperty({ example: 'Bank Statement (6 Months)' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Original bank statement with bank seal and signature showing sufficient funds.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: DocumentCategory,
    example: DocumentCategory.FINANCIAL,
    default: DocumentCategory.IDENTIFICATION,
  })
  @IsNotEmpty()
  @IsEnum(DocumentCategory)
  category: DocumentCategory;

  @ApiProperty({ example: true, default: true })
  @IsNotEmpty()
  @IsBoolean()
  required: boolean;

  @ApiProperty({
    enum: ApplicantType,
    isArray: true,
    example: [ApplicantType.ALL, ApplicantType.EMPLOYED],
    default: [ApplicantType.ALL],
  })
  @IsArray()
  @IsEnum(ApplicantType, { each: true })
  applicableFor: ApplicantType[];

  @ApiPropertyOptional({ example: 'Minimum closing balance of $3,500 recommended.' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ example: ['PDF', 'JPG', 'PNG'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  acceptedFormats?: string[];

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxFileSizeMb?: number;

  @ApiPropertyOptional({ example: 'https://assets.gomatric.com/samples/bank-statement-guide.pdf' })
  @IsOptional()
  @IsString()
  sampleUrl?: string;
}

export class VisaRequirementsFinancialDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'Proof of regular income and sufficient liquid funds.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 3500 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minBalance?: number;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  statementsMonths?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  sponsorAllowed?: boolean;
}

export class VisaRequirementsPassportDto {
  @ApiPropertyOptional({ example: 6, default: 6 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minValidityMonths?: number;

  @ApiPropertyOptional({ example: 2, default: 2 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  blankPages?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  previousPassportsRequired?: boolean;

  @ApiPropertyOptional({ example: 'Must be valid for at least 6 months beyond intended stay.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaRequirementsPhotoDto {
  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: '35x45mm, white background, matte finish, 80% face coverage' })
  @IsOptional()
  @IsString()
  specification?: string;

  @ApiPropertyOptional({ example: 35 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  widthMm?: number;

  @ApiPropertyOptional({ example: 45 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  heightMm?: number;

  @ApiPropertyOptional({ example: 'White', default: 'White' })
  @IsOptional()
  @IsString()
  background?: string;

  @ApiPropertyOptional({ example: 6, default: 6 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  recentMonths?: number;
}

export class VisaRequirementsInsuranceDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minCoverage?: number;

  @ApiPropertyOptional({ example: 'EUR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: 'Must cover medical repatriation and emergency hospitalization.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaRequirementsMinorDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  parentConsentRequired?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  birthCertificateRequired?: boolean;

  @ApiPropertyOptional({ example: 'Notarized NOC letter required if traveling with one parent.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaRequirementsBiometricsDto {
  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'Fingerprints and digital facial photograph at VAC center.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: ['Children under 5 years of age'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exemptions?: string[];
}

export class VisaRequirementsInterviewDto {
  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'In-person consular interview required unless waiver eligible.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  waiverEligible?: boolean;
}

export class VisaRequirementsAppointmentDto {
  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({
    enum: AppointmentBookingType,
    example: AppointmentBookingType.ONLINE,
    default: AppointmentBookingType.NOT_REQUIRED,
  })
  @IsOptional()
  @IsEnum(AppointmentBookingType)
  bookingType?: AppointmentBookingType;

  @ApiPropertyOptional({ example: 'Appointments must be booked online after fee submission.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaRequirementsAccommodationDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'Hotel reservation or host invitation letter.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaRequirementsInvitationDto {
  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @ApiPropertyOptional({ example: 'Formal invitation letter from host or business sponsor.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class VisaSpecificRequirementsDto {
  @ApiPropertyOptional({ type: VisaRequirementsFinancialDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsFinancialDto)
  financial?: VisaRequirementsFinancialDto;

  @ApiPropertyOptional({ type: VisaRequirementsPassportDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsPassportDto)
  passport?: VisaRequirementsPassportDto;

  @ApiPropertyOptional({ type: VisaRequirementsPhotoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsPhotoDto)
  photo?: VisaRequirementsPhotoDto;

  @ApiPropertyOptional({ type: VisaRequirementsInsuranceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsInsuranceDto)
  travelInsurance?: VisaRequirementsInsuranceDto;

  @ApiPropertyOptional({ type: VisaRequirementsAccommodationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsAccommodationDto)
  accommodation?: VisaRequirementsAccommodationDto;

  @ApiPropertyOptional({ type: VisaRequirementsInvitationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsInvitationDto)
  invitation?: VisaRequirementsInvitationDto;

  @ApiPropertyOptional({ type: VisaRequirementsMinorDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsMinorDto)
  minor?: VisaRequirementsMinorDto;

  @ApiPropertyOptional({ type: VisaRequirementsBiometricsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsBiometricsDto)
  biometrics?: VisaRequirementsBiometricsDto;

  @ApiPropertyOptional({ type: VisaRequirementsInterviewDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsInterviewDto)
  interview?: VisaRequirementsInterviewDto;

  @ApiPropertyOptional({ type: VisaRequirementsAppointmentDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaRequirementsAppointmentDto)
  appointment?: VisaRequirementsAppointmentDto;
}

export class ApplicationStepDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stepNumber: number;

  @ApiProperty({ example: 'Complete Online Assessment & Profile' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Fill out basic applicant information and upload clear passport copy.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: '15 mins' })
  @IsOptional()
  @IsString()
  estimatedTime?: string;
}

export class VisaFaqDto {
  @ApiProperty({ example: 'Can I extend this visa once inside the country?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: 'Generally, standard tourist visas cannot be extended from within.' })
  @IsNotEmpty()
  @IsString()
  answer: string;
}

export class VisaApplicationCenterDto {
  @ApiProperty({ example: 'VFS Global Visa Application Centre' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Level 4, Delta Life Tower, Gulshan-2, Dhaka' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'https://visa.vfsglobal.com' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ example: 'feedback.ukbd@vfshelpline.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '+8809606777888' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Sun - Thu: 09:00 AM - 04:00 PM' })
  @IsOptional()
  @IsString()
  workingHours?: string;
}

export class OptionalAgencyServiceDto {
  @ApiProperty({ example: 'Express Document Verification & Fast-track Slot' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Comprehensive file audit by senior visa manager within 4 hours.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  fee: number;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class CreateVisaServiceDto {
  @ApiProperty({ example: '66a1b2c3d4e5f6a7b8c9d0e1', description: 'Country MongoDB ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  countryId: string;

  @ApiProperty({ example: '66a1b2c3d4e5f6a7b8c9d0e2', description: 'VisaType MongoDB ObjectId' })
  @IsNotEmpty()
  @IsMongoId()
  visaTypeId: string;

  @ApiProperty({ example: 'UK Standard Visitor Visa (6 Months)', description: 'Visa service title' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'uk-standard-visitor-visa-6-months' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: 'Fast, reliable visa processing for leisure, business meetings, and family visits in the United Kingdom.',
  })
  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @ApiProperty({
    example: 'Complete guided concierge service for the UK standard 6-month multiple-entry visitor visa...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '6 Months' })
  @IsNotEmpty()
  @IsString()
  validity: string;

  @ApiProperty({ example: 'Up to 180 Days' })
  @IsNotEmpty()
  @IsString()
  stayDuration: string;

  @ApiProperty({
    enum: VisaEntryType,
    example: VisaEntryType.MULTIPLE,
    default: VisaEntryType.SINGLE,
  })
  @IsNotEmpty()
  @IsEnum(VisaEntryType)
  entryType: VisaEntryType;

  @ApiProperty({ type: ProcessingTimeDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProcessingTimeDto)
  processingTime: ProcessingTimeDto;

  @ApiPropertyOptional({ example: 'At least 4-6 weeks prior to planned travel date' })
  @IsOptional()
  @IsString()
  recommendedApplyBefore?: string;

  @ApiProperty({ type: VisaFeesDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VisaFeesDto)
  fees: VisaFeesDto;

  @ApiPropertyOptional({
    example: [
      'Genuine intention to visit and leave the UK at end of visit',
      'Ability to maintain and accommodate yourself without public funds',
      'Valid passport with at least 6 months validity',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  eligibility?: string[];

  @ApiPropertyOptional({
    example: [
      'No active immigration bans or criminal convictions',
      'Clean previous travel history is advantageous',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prerequisites?: string[];

  @ApiPropertyOptional({ type: [StructuredDocumentRequirementDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StructuredDocumentRequirementDto)
  documents?: StructuredDocumentRequirementDto[];

  @ApiPropertyOptional({ type: VisaSpecificRequirementsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaSpecificRequirementsDto)
  requirements?: VisaSpecificRequirementsDto;

  @ApiPropertyOptional({ type: [ApplicationStepDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationStepDto)
  applicationSteps?: ApplicationStepDto[];

  @ApiPropertyOptional({
    example: [
      'Visa fees once submitted to UKVI are strictly non-refundable.',
      'Providing forged or misleading documents leads to a mandatory 10-year ban.',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  importantNotes?: string[];

  @ApiPropertyOptional({ type: [VisaFaqDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VisaFaqDto)
  faqs?: VisaFaqDto[];

  @ApiPropertyOptional({ example: 'https://www.gov.uk/standard-visitor' })
  @IsOptional()
  @IsString()
  officialUrl?: string;

  @ApiPropertyOptional({ type: VisaApplicationCenterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaApplicationCenterDto)
  applicationCenter?: VisaApplicationCenterDto;

  @ApiPropertyOptional({ type: [OptionalAgencyServiceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionalAgencyServiceDto)
  optionalServices?: OptionalAgencyServiceDto[];

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  sortOrder?: number;
}

export class UpdateVisaServiceDto {
  @ApiPropertyOptional({ example: '66a1b2c3d4e5f6a7b8c9d0e1' })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @ApiPropertyOptional({ example: '66a1b2c3d4e5f6a7b8c9d0e2' })
  @IsOptional()
  @IsMongoId()
  visaTypeId?: string;

  @ApiPropertyOptional({ example: 'UK Standard Visitor Visa (6 Months)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'uk-standard-visitor-visa-6-months' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '6 Months' })
  @IsOptional()
  @IsString()
  validity?: string;

  @ApiPropertyOptional({ example: 'Up to 180 Days' })
  @IsOptional()
  @IsString()
  stayDuration?: string;

  @ApiPropertyOptional({ enum: VisaEntryType })
  @IsOptional()
  @IsEnum(VisaEntryType)
  entryType?: VisaEntryType;

  @ApiPropertyOptional({ type: ProcessingTimeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessingTimeDto)
  processingTime?: ProcessingTimeDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recommendedApplyBefore?: string;

  @ApiPropertyOptional({ type: VisaFeesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaFeesDto)
  fees?: VisaFeesDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  eligibility?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  prerequisites?: string[];

  @ApiPropertyOptional({ type: [StructuredDocumentRequirementDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StructuredDocumentRequirementDto)
  documents?: StructuredDocumentRequirementDto[];

  @ApiPropertyOptional({ type: VisaSpecificRequirementsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaSpecificRequirementsDto)
  requirements?: VisaSpecificRequirementsDto;

  @ApiPropertyOptional({ type: [ApplicationStepDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationStepDto)
  applicationSteps?: ApplicationStepDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  importantNotes?: string[];

  @ApiPropertyOptional({ type: [VisaFaqDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VisaFaqDto)
  faqs?: VisaFaqDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  officialUrl?: string;

  @ApiPropertyOptional({ type: VisaApplicationCenterDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => VisaApplicationCenterDto)
  applicationCenter?: VisaApplicationCenterDto;

  @ApiPropertyOptional({ type: [OptionalAgencyServiceDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionalAgencyServiceDto)
  optionalServices?: OptionalAgencyServiceDto[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  sortOrder?: number;
}

export class VisaServiceFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by Country MongoDB ObjectId' })
  @IsOptional()
  @IsMongoId()
  countryId?: string;

  @ApiPropertyOptional({ description: 'Filter by VisaType MongoDB ObjectId' })
  @IsOptional()
  @IsMongoId()
  visaTypeId?: string;

  @ApiPropertyOptional({ description: 'Filter by country slug' })
  @IsOptional()
  @IsString()
  countrySlug?: string;

  @ApiPropertyOptional({ description: 'Filter by visa type slug' })
  @IsOptional()
  @IsString()
  visaTypeSlug?: string;

  @ApiPropertyOptional({ enum: VisaEntryType, description: 'Filter by entry type' })
  @IsOptional()
  @IsEnum(VisaEntryType)
  entryType?: VisaEntryType;

  @ApiPropertyOptional({ description: 'Filter by featured services' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}
