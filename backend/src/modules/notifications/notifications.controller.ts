import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/notification.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { Role } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Send notification to user (Staff only)' })
  @ApiResponse({ status: 201, description: 'Notification sent' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user notifications' })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean })
  async findMyNotifications(
    @CurrentUser('id') userId: string,
    @Query() paginationDto: PaginationDto,
    @Query('unreadOnly') unreadOnly?: boolean,
  ) {
    return this.notificationsService.findForUser(userId, paginationDto, unreadOnly);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark specific notification as read' })
  async markAsRead(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser('id') userId: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all user notifications as read' })
  async markAllAsRead(@CurrentUser('id') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }
}
