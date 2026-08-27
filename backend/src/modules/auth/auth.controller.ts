import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { CurrentUser, Public } from '../../common/decorators';
import { JwtAuthGuard, RefreshTokenGuard } from '../../common/guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new customer account' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    return this.authService.register(dto, ip, userAgent);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    return this.authService.login(dto, ip, userAgent);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using valid refresh token' })
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed' })
  async refreshTokens(@CurrentUser() user: any) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log out current user and invalidate refresh session' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@CurrentUser('id') userId: string, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    return this.authService.logout(userId, ip, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get profile of current authenticated user' })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  async getMe(@CurrentUser('id') userId: string) {
    return this.authService.getMe(userId);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset token' })
  @ApiResponse({ status: 200, description: 'Password reset request acknowledged' })
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    return this.authService.forgotPassword(dto, ip, userAgent);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  async resetPassword(@Body() dto: ResetPasswordDto, @Req() req: Request) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');
    return this.authService.resetPassword(dto, ip, userAgent);
  }
}
