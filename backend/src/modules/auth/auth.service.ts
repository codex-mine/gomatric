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
import { Response } from 'express';
import { UsersRepository } from '../users/users.repository';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyEmailDto,
  ResendVerificationDto,
  ActivateAccountDto,
} from './dto/auth.dto';
import { Role } from '../../common/constants/roles.enum';
import { ROLE_PERMISSIONS } from '../../common/constants/permissions.enum';
import { HashUtil } from '../../common/utils/hash.util';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../../common/constants/status.enum';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditLogsService: AuditLogsService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Register a new customer user, send 6-digit verification code, and issue auth session
   */
  async register(dto: RegisterDto, ipAddress?: string, userAgent?: string, res?: Response) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.usersRepository.findOne({ email });

    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const passwordHash = await HashUtil.hash(dto.password);
    const verificationCode = this.generateOtpCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await this.usersRepository.create({
      name: dto.name.trim(),
      email,
      passwordHash,
      phone: dto.phone?.trim(),
      role: Role.CUSTOMER,
      isActive: true,
      isEmailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpires,
      lastLoginAt: new Date(),
    });

    const userId = (user as any).id || (user as any)._id.toString();
    const tokens = await this.generateTokens(userId, user.email, user.role);
    const refreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      refreshTokenHash,
    });

    // Send 6-digit verification email
    await this.mailService.sendVerificationCode(user.email, user.name, verificationCode);

    // Set secure HTTP-only cookies if response object is present
    if (res) {
      this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    }

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
      message: 'Registration successful. A 6-digit verification code has been sent to your email.',
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isEmailVerified: false,
        permissions: ROLE_PERMISSIONS[user.role] || [],
      },
      tokens,
      ...(process.env.NODE_ENV !== 'production' ? { devVerificationCode: verificationCode } : {}),
    };
  }

  /**
   * Authenticate user with email and password
   */
  async login(dto: LoginDto, ipAddress?: string, userAgent?: string, res?: Response) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account is inactive or suspended. Please contact support.');
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

    // Set secure HTTP-only cookies
    if (res) {
      this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    }

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
      message: 'Login successful.',
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isEmailVerified: (user as any).isEmailVerified ?? true,
        permissions: ROLE_PERMISSIONS[user.role] || [],
      },
      tokens,
    };
  }

  /**
   * Verify email using 6-digit code
   */
  async verifyEmail(dto: VerifyEmailDto, ipAddress?: string, userAgent?: string, res?: Response) {
    const email = dto.email.toLowerCase().trim();
    const code = dto.code.trim();

    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException('User with this email was not found.');
    }

    if ((user as any).isEmailVerified) {
      const userId = (user as any).id || (user as any)._id.toString();
      const tokens = await this.generateTokens(userId, user.email, user.role);
      if (res) this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

      return {
        message: 'Email address is already verified.',
        user: {
          id: userId,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isEmailVerified: true,
          permissions: ROLE_PERMISSIONS[user.role] || [],
        },
        tokens,
      };
    }

    const verificationCode = (user as any).emailVerificationCode;
    const expiresAt = (user as any).emailVerificationExpires;

    if (!verificationCode || verificationCode !== code) {
      throw new BadRequestException('Invalid verification code.');
    }

    if (expiresAt && new Date(expiresAt) < new Date()) {
      throw new BadRequestException('Verification code has expired. Please request a new code.');
    }

    const userId = (user as any).id || (user as any)._id.toString();
    const tokens = await this.generateTokens(userId, user.email, user.role);
    const refreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      isEmailVerified: true,
      isActive: true,
      emailVerificationCode: null,
      emailVerificationExpires: null,
      refreshTokenHash,
    });

    // Send account activated greeting email
    await this.mailService.sendAccountActivation(user.email, user.name);

    if (res) {
      this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    }

    await this.auditLogsService.log({
      actor: userId,
      actorRole: user.role,
      actorEmail: user.email,
      action: AuditAction.USER_UPDATED,
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
      metadata: { action: 'EMAIL_VERIFIED' },
    });

    return {
      message: 'Email verified successfully. Welcome to GoMatric!',
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isEmailVerified: true,
        permissions: ROLE_PERMISSIONS[user.role] || [],
      },
      tokens,
    };
  }

  /**
   * Resend 6-digit verification code
   */
  async resendVerification(dto: ResendVerificationDto, ipAddress?: string, userAgent?: string) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      return {
        message: 'If the email exists in our system, a new verification code has been dispatched.',
      };
    }

    if ((user as any).isEmailVerified) {
      return {
        message: 'This email account is already verified.',
      };
    }

    const newCode = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const userId = (user as any).id || (user as any)._id.toString();
    await this.usersRepository.findByIdAndUpdate(userId, {
      emailVerificationCode: newCode,
      emailVerificationExpires: expiresAt,
    });

    await this.mailService.sendVerificationCode(user.email, user.name, newCode);

    return {
      message: 'A new 6-digit verification code has been sent to your email.',
      ...(process.env.NODE_ENV !== 'production' ? { devVerificationCode: newCode } : {}),
    };
  }

  /**
   * Request password reset code / link
   */
  async forgotPassword(dto: ForgotPasswordDto, ipAddress?: string, userAgent?: string) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.usersRepository.findOne({ email });

    // Always return neutral message to prevent email enumeration
    if (!user) {
      return {
        message: 'If this email is registered, a password reset code has been sent.',
      };
    }

    const resetCode = this.generateOtpCode();
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const userId = (user as any).id || (user as any)._id.toString();
    await this.usersRepository.findByIdAndUpdate(userId, {
      passwordResetCode: resetCode,
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    await this.mailService.sendPasswordResetCode(user.email, user.name, resetCode);

    await this.auditLogsService.log({
      actor: userId,
      actorEmail: user.email,
      action: AuditAction.PASSWORD_RESET_REQUESTED,
      resource: 'User',
      resourceId: userId,
      ipAddress,
      userAgent,
    });

    return {
      message: 'If this email is registered, a 6-digit password recovery code has been sent.',
      ...(process.env.NODE_ENV !== 'production' ? { devResetCode: resetCode, devResetToken: resetToken } : {}),
    };
  }

  /**
   * Reset password using 6-digit code or reset token
   */
  async resetPassword(dto: ResetPasswordDto, ipAddress?: string, userAgent?: string) {
    let user: any = null;

    if (dto.email && dto.code) {
      user = await this.usersRepository.findOne({
        email: dto.email.toLowerCase().trim(),
        passwordResetCode: dto.code.trim(),
        passwordResetExpires: { $gt: new Date() },
      });
    } else if (dto.token) {
      user = await this.usersRepository.findOne({
        passwordResetToken: dto.token.trim(),
        passwordResetExpires: { $gt: new Date() },
      });
    }

    if (!user) {
      throw new BadRequestException('Password reset code or token is invalid or has expired.');
    }

    const passwordHash = await HashUtil.hash(dto.newPassword);
    const userId = (user as any).id || (user as any)._id.toString();

    await this.usersRepository.findByIdAndUpdate(userId, {
      passwordHash,
      passwordResetCode: null,
      passwordResetToken: null,
      passwordResetExpires: null,
      refreshTokenHash: null, // Revoke all existing sessions
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

  /**
   * Activate or deactivate account (Admin / Manager)
   */
  async activateAccount(dto: ActivateAccountDto, actorId?: string, actorRole?: string, ipAddress?: string, userAgent?: string) {
    const user = await this.usersRepository.findById(dto.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isActive = dto.isActive ?? true;
    await this.usersRepository.findByIdAndUpdate(dto.userId, {
      isActive,
      ...(isActive ? { isEmailVerified: true } : {}),
    });

    if (isActive) {
      await this.mailService.sendAccountActivation(user.email, user.name);
    }

    await this.auditLogsService.log({
      actor: actorId || dto.userId,
      actorRole: (actorRole as Role) || Role.ADMIN,
      action: AuditAction.USER_UPDATED,
      resource: 'User',
      resourceId: dto.userId,
      ipAddress,
      userAgent,
      metadata: { isActive },
    });

    return {
      message: `Account has been ${isActive ? 'activated' : 'deactivated'} successfully.`,
    };
  }

  /**
   * Refresh JWT tokens via cookie or bearer/body token
   */
  async refreshTokens(userId: string, refreshToken: string, res?: Response) {
    const user = await this.usersRepository.findById(userId);
    if (!user || !user.refreshTokenHash || !user.isActive) {
      throw new ForbiddenException('Access denied. Invalid session.');
    }

    const isMatch = await HashUtil.verify(user.refreshTokenHash, refreshToken);
    if (!isMatch) {
      await this.usersRepository.findByIdAndUpdate(userId, { refreshTokenHash: null });
      throw new ForbiddenException('Access denied. Refresh token compromised.');
    }

    const tokens = await this.generateTokens(userId, user.email, user.role);
    const newRefreshTokenHash = await HashUtil.hash(tokens.refreshToken);

    await this.usersRepository.findByIdAndUpdate(userId, {
      refreshTokenHash: newRefreshTokenHash,
    });

    if (res) {
      this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    }

    return tokens;
  }

  /**
   * Invalidate session and clear auth cookies
   */
  async logout(userId: string, ipAddress?: string, userAgent?: string, res?: Response) {
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

    if (res) {
      this.clearAuthCookies(res);
    }

    return { message: 'Logged out successfully.' };
  }

  /**
   * Get authenticated user profile with permissions
   */
  async getMe(userId: string) {
    const user = await this.usersRepository.findByIdOrThrow(userId);
    return {
      id: (user as any).id || (user as any)._id?.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      isActive: user.isActive,
      isEmailVerified: (user as any).isEmailVerified ?? true,
      lastLoginAt: user.lastLoginAt,
      permissions: ROLE_PERMISSIONS[user.role] || [],
    };
  }

  /**
   * Set secure HTTP-only cookies on HTTP response
   */
  public setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
  }

  /**
   * Clear auth cookies on HTTP response
   */
  public clearAuthCookies(res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
  }

  private generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
