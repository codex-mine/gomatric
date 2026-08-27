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
import { VisaApplicationStatus } from '../../../common/constants/status.enum';

export class CreateVisaApplicationDto {
  @ApiProperty({ description: 'Customer ID' })
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty({ example: 'United Arab Emirates' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: '30 Days Tourist Visa' })
  @IsNotEmpty()
  @IsString()
  visaType: string;

  @ApiPropertyOptional({ example: '2026-10-15' })
  @IsOptional()
  @IsDateString()
  travelDate?: string;

  @ApiPropertyOptional({ example: '2026-10-25' })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  travelersCount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  applicantDetails?: {
    fullName: string;
    passportNumber: string;
    passportExpiry?: string;
    dateOfBirth?: string;
    nationality?: string;
    gender?: string;
    email?: string;
    phone?: string;
  };

  @ApiPropertyOptional({ description: 'Assigned agent user ID' })
  @IsOptional()
  @IsString()
  assignedAgent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateVisaStatusDto {
  @ApiProperty({ enum: VisaApplicationStatus })
  @IsNotEmpty()
  @IsEnum(VisaApplicationStatus)
  status: VisaApplicationStatus;

  @ApiPropertyOptional({ example: 'Documents verified and sent to embassy' })
  @IsOptional()
  @IsString()
  remarks?: string;
}

export class UpdateVisaApplicationDto extends CreateVisaApplicationDto {}
