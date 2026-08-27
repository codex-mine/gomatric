import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuditAction, Role } from '../../../common/constants';

export class CreateAuditLogDto {
  @IsOptional()
  @IsString()
  actor?: string;

  @IsOptional()
  @IsEnum(Role)
  actorRole?: Role;

  @IsOptional()
  @IsString()
  actorEmail?: string;

  @IsNotEmpty()
  @IsEnum(AuditAction)
  action: AuditAction;

  @IsNotEmpty()
  @IsString()
  resource: string;

  @IsOptional()
  @IsString()
  resourceId?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
