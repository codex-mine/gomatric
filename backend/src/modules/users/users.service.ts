import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { HashUtil } from '../../common/utils/hash.util';
import { Role } from '../../common/constants/roles.enum';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { AuditAction } from '../../common/constants/status.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly auditLogsService: AuditLogsService,
  ) {}

  async create(createUserDto: CreateUserDto, creatorId?: string) {
    const existing = await this.usersRepository.findOne({
      email: createUserDto.email.toLowerCase(),
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await HashUtil.hash(createUserDto.password);

    const user = await this.usersRepository.create({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
      passwordHash,
      role: createUserDto.role || Role.CUSTOMER,
    });

    await this.auditLogsService.log({
      actor: creatorId || (user as any).id,
      actorRole: createUserDto.role || Role.CUSTOMER,
      actorEmail: user.email,
      action: AuditAction.USER_CREATED,
      resource: 'User',
      resourceId: (user as any).id,
      metadata: { role: user.role },
    });

    return user;
  }

  async findAll(paginationDto: PaginationDto) {
    const filter: any = {};
    if (paginationDto.search) {
      filter.$or = [
        { name: { $regex: paginationDto.search, $options: 'i' } },
        { email: { $regex: paginationDto.search, $options: 'i' } },
        { phone: { $regex: paginationDto.search, $options: 'i' } },
      ];
    }
    return this.usersRepository.findPaginated(filter, paginationDto);
  }

  async findById(id: string) {
    return this.usersRepository.findByIdOrThrow(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ email: email.toLowerCase() });
  }

  async update(id: string, updateUserDto: UpdateUserDto, updaterId?: string) {
    if (updateUserDto.email) {
      const existing = await this.usersRepository.findOne({
        email: updateUserDto.email.toLowerCase(),
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('Email is already in use by another account');
      }
      updateUserDto.email = updateUserDto.email.toLowerCase();
    }

    const updated = await this.usersRepository.findByIdAndUpdate(id, updateUserDto);
    if (!updated) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.auditLogsService.log({
      actor: updaterId || id,
      action: AuditAction.USER_UPDATED,
      resource: 'User',
      resourceId: id,
      metadata: updateUserDto,
    });

    return updated;
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isValid = await HashUtil.verify(user.passwordHash, dto.currentPassword);
    if (!isValid) {
      throw new BadRequestException('Current password does not match');
    }

    const newPasswordHash = await HashUtil.hash(dto.newPassword);
    await this.usersRepository.findByIdAndUpdate(id, {
      passwordHash: newPasswordHash,
      refreshTokenHash: null,
    });

    await this.auditLogsService.log({
      actor: id,
      action: AuditAction.USER_UPDATED,
      resource: 'User',
      resourceId: id,
      metadata: { action: 'PASSWORD_CHANGED' },
    });

    return { message: 'Password updated successfully' };
  }

  async remove(id: string, actorId?: string) {
    const user = await this.usersRepository.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.auditLogsService.log({
      actor: actorId,
      action: AuditAction.USER_DELETED,
      resource: 'User',
      resourceId: id,
      metadata: { email: user.email },
    });

    return { message: 'User deleted successfully' };
  }
}
