import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateCountryDto {
  @ApiProperty({ example: 'United Kingdom', description: 'Country official name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'united-kingdom', description: 'Unique URL slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'GBR', description: 'Country 3-letter code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'GB', description: 'ISO 3166-1 alpha-2 code' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  iso2: string;

  @ApiProperty({ example: 'GBR', description: 'ISO 3166-1 alpha-3 code' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  iso3: string;

  @ApiProperty({ example: '🇬🇧', description: 'Country flag emoji or asset URL' })
  @IsNotEmpty()
  @IsString()
  flag: string;

  @ApiPropertyOptional({ example: 'Explore travel, business, and study visas for the UK.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Europe' })
  @IsOptional()
  @IsString()
  continent?: string;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

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

export class UpdateCountryDto {
  @ApiPropertyOptional({ example: 'United Kingdom' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'united-kingdom' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'GBR' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: 'GB' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  iso2?: string;

  @ApiPropertyOptional({ example: 'GBR' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  iso3?: string;

  @ApiPropertyOptional({ example: '🇬🇧' })
  @IsOptional()
  @IsString()
  flag?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  continent?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

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

export class CountryFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Filter by popular countries' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isPopular?: boolean;

  @ApiPropertyOptional({ description: 'Filter by continent' })
  @IsOptional()
  @IsString()
  continent?: string;
}
