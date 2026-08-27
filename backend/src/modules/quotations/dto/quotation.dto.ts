import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationStatus } from '../../../common/constants/status.enum';

export class QuotationItemDto {
  @ApiProperty({ example: 'Dubai 5-Day Hotel + Transfer Package' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '4-star hotel stay with airport transfers' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2, default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 45000 })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({ example: 90000 })
  @IsNumber()
  @Min(0)
  total: number;
}

export class CreateQuotationDto {
  @ApiPropertyOptional({ description: 'Lead ID' })
  @IsOptional()
  @IsString()
  lead?: string;

  @ApiProperty({ description: 'Customer ID' })
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiPropertyOptional({ description: 'Service ID' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiPropertyOptional({ description: 'Destination ID' })
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiProperty({ type: [QuotationItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  items: QuotationItemDto[];

  @ApiProperty({ example: 90000 })
  @IsNumber()
  @Min(0)
  subtotal: number;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  tax?: number;

  @ApiPropertyOptional({ example: 5000, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({ example: 85000 })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiPropertyOptional({ example: 'BDT', default: 'BDT' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: '50% advance upon confirmation, 50% prior to travel' })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiPropertyOptional({ example: '2026-09-30' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ enum: QuotationStatus, default: QuotationStatus.DRAFT })
  @IsOptional()
  @IsEnum(QuotationStatus)
  status?: QuotationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateQuotationStatusDto {
  @ApiProperty({ enum: QuotationStatus })
  @IsNotEmpty()
  @IsEnum(QuotationStatus)
  status: QuotationStatus;
}
