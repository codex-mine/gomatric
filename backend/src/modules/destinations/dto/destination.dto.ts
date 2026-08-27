import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateDestinationDto {
  @ApiProperty({ example: 'Dubai' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'dubai' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: 'United Arab Emirates' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: 'AE' })
  @IsOptional()
  @IsString()
  countryCode?: string;

  @ApiPropertyOptional({ example: 'Experience the modern wonders of Dubai...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/dubai.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ example: ['https://example.com/dubai1.jpg'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  popular?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: 45000, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  startingPrice?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDestinationDto extends CreateDestinationDto {}
