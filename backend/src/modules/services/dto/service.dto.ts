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
import { ServiceCategory } from '../../../common/constants/status.enum';

export class CreateServiceDto {
  @ApiProperty({ example: 'Dubai Tourist Visa' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'dubai-tourist-visa' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ enum: ServiceCategory, default: ServiceCategory.VISA })
  @IsNotEmpty()
  @IsEnum(ServiceCategory)
  category: ServiceCategory;

  @ApiProperty({ example: 'Fast and reliable Dubai visa assistance.' })
  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @ApiPropertyOptional({ example: 'Full details about visa documentation...' })
  @IsOptional()
  @IsString()
  fullDescription?: string;

  @ApiPropertyOptional({ example: 'passport-icon' })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({ example: 'https://example.com/dubai-visa.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ example: 12000, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  order?: number;
}

export class UpdateServiceDto extends CreateServiceDto {}
