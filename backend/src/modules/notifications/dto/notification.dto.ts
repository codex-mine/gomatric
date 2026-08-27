import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NotificationChannel, NotificationType } from '../../../common/constants/status.enum';

export class CreateNotificationDto {
  @ApiProperty({ description: 'User ID of recipient' })
  @IsNotEmpty()
  @IsString()
  recipient: string;

  @ApiProperty({ example: 'Visa Application Updated' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Your visa application has moved to Processing state.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ enum: NotificationType, default: NotificationType.INFO })
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiPropertyOptional({ enum: NotificationChannel, default: NotificationChannel.IN_APP })
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: Record<string, any>;
}
