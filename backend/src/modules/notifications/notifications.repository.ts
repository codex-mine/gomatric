import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../../database/abstract.repository';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsRepository extends AbstractRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
