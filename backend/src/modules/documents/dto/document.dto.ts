import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DocumentType, VerificationStatus } from '../../../common/constants/status.enum';

export class CreateDocumentDto {
  @ApiProperty({ description: 'Customer ID' })
  @IsNotEmpty()
  @IsString()
  customer: string;

  @ApiProperty({ example: 'VISA_APPLICATION' })
  @IsNotEmpty()
  @IsString()
  entityType: string;

  @ApiPropertyOptional({ description: 'Related entity ID' })
  @IsOptional()
  @IsString()
  entityId?: string;

  @ApiProperty({ enum: DocumentType, default: DocumentType.PASSPORT })
  @IsNotEmpty()
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty({ example: 'passport_scan.pdf' })
  @IsNotEmpty()
  @IsString()
  originalName: string;

  @ApiProperty({ example: 'https://storage.gomatric.com/docs/passport.pdf' })
  @IsNotEmpty()
  @IsString()
  fileUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fileKey?: string;

  @ApiPropertyOptional({ example: 1048576 })
  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @ApiPropertyOptional({ example: 'application/pdf' })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiPropertyOptional({ example: '2030-05-15' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateDocumentVerificationDto {
  @ApiProperty({ enum: VerificationStatus })
  @IsNotEmpty()
  @IsEnum(VerificationStatus)
  verificationStatus: VerificationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
