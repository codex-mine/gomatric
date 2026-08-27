import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeadPriority, LeadStatus } from '../../../common/constants/status.enum';

export class ContactInfoDto {
  @ApiProperty({ example: 'Rahim Ahmed' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'rahim@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: '+8801711223344' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateLeadDto {
  @ApiPropertyOptional({ description: 'Existing customer ID' })
  @IsOptional()
  @IsString()
  customer?: string;

  @ApiPropertyOptional({ type: ContactInfoDto })
  @IsOptional()
  contactInfo?: ContactInfoDto;

  @ApiPropertyOptional({ description: 'Service ID' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiPropertyOptional({ description: 'Destination ID' })
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiPropertyOptional({ enum: LeadPriority, default: LeadPriority.MEDIUM })
  @IsOptional()
  @IsEnum(LeadPriority)
  priority?: LeadPriority;

  @ApiPropertyOptional({ example: 'WEBSITE', default: 'WEBSITE' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ example: 'Interested in Dubai 5-day tour with family.' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional()
  @IsOptional()
  requirements?: Record<string, any>;
}

export class UpdateLeadDto {
  @ApiPropertyOptional({ enum: LeadStatus })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional({ enum: LeadPriority })
  @IsOptional()
  @IsEnum(LeadPriority)
  priority?: LeadPriority;

  @ApiPropertyOptional({ description: 'Agent user ID' })
  @IsOptional()
  @IsString()
  assignedAgent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: '2026-09-01' })
  @IsOptional()
  @IsDateString()
  followUpDate?: string;
}
