import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VisaCategory } from '../enums/visa-service.enum';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateVisaTypeDto {
  @ApiProperty({ example: 'Tourist Visa', description: 'Visa type name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'tourist-visa', description: 'Unique slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    enum: VisaCategory,
    example: VisaCategory.TOURIST,
    description: 'Visa broad category',
  })
  @IsNotEmpty()
  @IsEnum(VisaCategory)
  category: VisaCategory;

  @ApiPropertyOptional({
    example: 'For holiday travel, tourism, sightseeing, and leisure visits.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'plane-takeoff' })
  @IsOptional()
  @IsString()
  icon?: string;

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

export class UpdateVisaTypeDto {
  @ApiPropertyOptional({ example: 'Tourist Visa' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'tourist-visa' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ enum: VisaCategory })
  @IsOptional()
  @IsEnum(VisaCategory)
  category?: VisaCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  sortOrder?: number;
}

export class VisaTypeFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: VisaCategory, description: 'Filter by visa category' })
  @IsOptional()
  @IsEnum(VisaCategory)
  category?: VisaCategory;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}
