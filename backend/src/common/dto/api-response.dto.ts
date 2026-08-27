import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaDto {
  @ApiPropertyOptional({ example: 1 })
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;

  @ApiPropertyOptional({ example: 100 })
  total?: number;

  @ApiPropertyOptional({ example: 10 })
  totalPages?: number;

  @ApiPropertyOptional({ example: true })
  hasNextPage?: boolean;

  @ApiPropertyOptional({ example: false })
  hasPreviousPage?: boolean;
}

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Request successful' })
  message: string;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional({ type: MetaDto })
  meta?: MetaDto;

  @ApiPropertyOptional({ example: '2026-08-27T05:25:00.000Z' })
  timestamp?: string;

  constructor(partial: Partial<ApiResponseDto<T>>) {
    Object.assign(this, partial);
    if (!this.timestamp) {
      this.timestamp = new Date().toISOString();
    }
  }
}
