import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../../users/users.repository';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtAccessSecret') || 'dev_jwt_access_secret',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account is inactive or not found.');
    }

    return {
      id: (user as any).id || (user as any)._id?.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
    };
  }
}
