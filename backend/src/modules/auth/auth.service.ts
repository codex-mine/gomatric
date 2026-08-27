import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { Role } from '../../common/constants/roles.enum';
import { HashUtil } from '../../common/utils/hash.util';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../../common/constants/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  async register(dto: RegisterDto, ipAddress?: string, userAgent?: string) {
    const existing = await this.usersRepository.findOne({
      email: dto.email.toLowerCase(),
    });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await HashUtil.hash(dto.password);

    const user = await this.usersRepository.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      passwordHash,
      phone: dto.phone,
      role: Role.CUSTOMER,
      isActive: true,
      lastLoginAt: new Date(),
    });

    const userId = (user as any).id || (user as any)._id.toString();
    const tokens = await this.generateTokens(userId, user.email, user.role);
    const refreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      refreshTokenHash,
    });

    await this.auditLogsService.log({
      actor: userId,
      actorRole: Role.CUSTOMER,
      actorEmail: user.email,
      action: AuditAction.USER_REGISTER,
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
      metadata: { role: Role.CUSTOMER },
    });

    return {
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      tokens,
    };
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.usersRepository.findOne({
      email: dto.email.toLowerCase(),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is inactive. Please contact support.');
    }

    const isPasswordValid = await HashUtil.verify(user.passwordHash, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const userId = (user as any).id || (user as any)._id.toString();
    const tokens = await this.generateTokens(userId, user.email, user.role);
    const refreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      refreshTokenHash,
      lastLoginAt: new Date(),
    });

    await this.auditLogsService.log({
      actor: userId,
      actorRole: user.role,
      actorEmail: user.email,
      action: AuditAction.USER_LOGIN,
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    });

    return {
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      tokens,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user || !user.refreshTokenHash || !user.isActive) {
      throw new ForbiddenException('Access denied. Invalid session.');
    }

    const isMatch = await HashUtil.verify(user.refreshTokenHash, refreshToken);
    if (!isMatch) {
      // Possible token reuse attack — clear refresh token
      await this.usersRepository.findByIdAndUpdate(userId, { refreshTokenHash: null });
      throw new ForbiddenException('Access denied. Refresh token compromised.');
    }

    const tokens = await this.generateTokens(userId, user.email, user.role);
    const newRefreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      refreshTokenHash: newRefreshTokenHash,
    });

    return tokens;
  }

  async logout(userId: string, ipAddress?: string, userAgent?: string) {
    const user = await this.usersRepository.findById(userId);
    if (user) {
      await this.usersRepository.findByIdAndUpdate(userId, {
        refreshTokenHash: null,
      });

      await this.auditLogsService.log({
        actor: userId,
        actorRole: user.role,
        actorEmail: user.email,
        action: AuditAction.USER_LOGOUT,
        resource: 'User',
        resourceId: userId,
        ipAddress,
        userAgent,
      });
    }

    return { message: 'Logged out successfully' };
  }

  async getMe(userId: string) {
    const user = await this.usersRepository.findByIdOrThrow(userId);
    return user;
  }

  async forgotPassword(dto: ForgotPasswordDto, ipAddress?: string, userAgent?: string) {
    const user = await this.usersRepository.findOne({
      email: dto.email.toLowerCase(),
    });

    // Always return success message to prevent user enumeration attacks
    if (!user) {
      return {
        message: 'If the email exists in our system, a password reset link has been sent.',
      };
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.usersRepository.findByIdAndUpdate((user as any).id || (user as any)._id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    await this.auditLogsService.log({
      actor: (user as any).id || (user as any)._id,
      actorEmail: user.email,
      action: AuditAction.PASSWORD_RESET_REQUESTED,
      resource: 'User',
      resourceId: (user as any).id || (user as any)._id,
      ipAddress,
      userAgent,
    });

    // In a full email module integration, this sends an email with resetToken
    return {
      message: 'If the email exists in our system, a password reset link has been sent.',
      // For development convenience, expose resetToken in non-prod
      ...(process.env.NODE_ENV !== 'production' ? { devResetToken: resetToken } : {}),
    };
  }

  async resetPassword(dto: ResetPasswordDto, ipAddress?: string, userAgent?: string) {
    const user = await this.usersRepository.findOne({
      passwordResetToken: dto.token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Password reset token is invalid or has expired.');
    }

    const passwordHash = await HashUtil.hash(dto.newPassword);
    const userId = (user as any).id || (user as any)._id.toString();

    await this.usersRepository.findByIdAndUpdate(userId, {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpires: null,
      refreshTokenHash: null,
    });

    await this.auditLogsService.log({
      actor: userId,
      actorEmail: user.email,
      action: AuditAction.PASSWORD_RESET_COMPLETED,
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    });

    return {
      message: 'Password has been reset successfully. Please log in with your new password.',
    };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.jwtAccessSecret'),
        expiresIn: this.configService.get<string>('auth.jwtAccessExpiresIn') || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('auth.jwtRefreshSecret'),
        expiresIn: this.configService.get<string>('auth.jwtRefreshExpiresIn') || '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('auth.jwtAccessExpiresIn') || '15m',
    };
  }
}
