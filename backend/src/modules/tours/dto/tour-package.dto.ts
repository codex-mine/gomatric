import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ItineraryDayDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  day: number;

  @ApiProperty({ example: 'Arrival in Dubai' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Airport pickup, check-in to hotel, evening dhow cruise.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: ['Dinner'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  meals?: string[];

  @ApiPropertyOptional({ example: ['Airport Transfer', 'Dhow Cruise'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activities?: string[];
}

export class CreateTourPackageDto {
  @ApiProperty({ example: 'Dubai Explorer 5 Days / 4 Nights' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'dubai-explorer-5d4n' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Destination ID' })
  @IsNotEmpty()
  @IsString()
  destination: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  durationDays: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(0)
  durationNights: number;

  @ApiProperty({ example: 65000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 59999 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPrice?: number;

  @ApiPropertyOptional({ example: 'Complete 5-day Dubai holiday package...' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'https://example.com/dubai-tour.jpg' })
  @IsOptional()
  @IsString()
  featuredImage?: string;

  @ApiPropertyOptional({ example: ['https://example.com/dubai-tour-1.jpg'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @ApiPropertyOptional({ example: ['4-star Hotel', 'Airport Transfer', 'City Tour', 'Breakfast'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includes?: string[];

  @ApiPropertyOptional({ example: ['Airfare', 'Visa fees', 'Personal expenses'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludes?: string[];

  @ApiPropertyOptional({ type: [ItineraryDayDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryDayDto)
  itinerary?: ItineraryDayDto[];

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsOptional()
  @IsNumber()
  maxGroupSize?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateTourPackageDto extends CreateTourPackageDto {}
