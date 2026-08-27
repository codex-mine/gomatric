import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDto } from './dto/notification.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const payload: any = {
      ...createNotificationDto,
      recipient: new Types.ObjectId(createNotificationDto.recipient),
    };
    return this.notificationsRepository.create(payload);
  }

  async findForUser(userId: string, paginationDto: PaginationDto, unreadOnly = false) {
    const filter: any = { recipient: new Types.ObjectId(userId) };
    if (unreadOnly) {
      filter.isRead = false;
    }
    return this.notificationsRepository.findPaginated(filter, paginationDto);
  }

  async markAsRead(id: string, userId: string) {
    const updated = await this.notificationsRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id), recipient: new Types.ObjectId(userId) },
      { isRead: true, readAt: new Date() },
    );
    if (!updated) {
      throw new NotFoundException('Notification not found');
    }
    return updated;
  }

  async markAllAsRead(userId: string) {
    await this.notificationsRepository.findOneAndUpdate(
      { recipient: new Types.ObjectId(userId), isRead: false },
      { isRead: true, readAt: new Date() },
      { multi: true },
    );
    return { message: 'All notifications marked as read' };
  }
}
