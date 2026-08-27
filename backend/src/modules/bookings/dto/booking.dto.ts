import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BookingStatus, PaymentStatus } from '../../../common/constants/status.enum';

export class CreateBookingDto {
  @ApiPropertyOptional({ description: 'Quotation ID' })
  @IsOptional()
  @IsString()
  quotation?: string;

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

  @ApiPropertyOptional({ example: 2, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  travelersCount?: number;

  @ApiPropertyOptional({ example: '2026-10-15' })
  @IsOptional()
  @IsDateString()
  travelDate?: string;

  @ApiPropertyOptional({ example: '2026-10-25' })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({ example: 85000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiPropertyOptional({ example: 'BDT', default: 'BDT' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ enum: BookingStatus, default: BookingStatus.PENDING })
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;

  @ApiPropertyOptional({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({ description: 'Assigned Agent user ID' })
  @IsOptional()
  @IsString()
  assignedAgent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateBookingStatusDto {
  @ApiPropertyOptional({ enum: BookingStatus })
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;

  @ApiPropertyOptional({ enum: PaymentStatus })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
