import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/booking.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { Role, BookingStatus, PaymentStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Create new booking' })
  @ApiResponse({ status: 201, description: 'Booking created' })
  async create(@Body() createBookingDto: CreateBookingDto, @CurrentUser('id') userId: string) {
    return this.bookingsService.create(createBookingDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated bookings' })
  @ApiQuery({ name: 'status', enum: BookingStatus, required: false })
  @ApiQuery({ name: 'paymentStatus', enum: PaymentStatus, required: false })
  @ApiQuery({ name: 'customerId', required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: BookingStatus,
    @Query('paymentStatus') paymentStatus?: PaymentStatus,
    @Query('customerId') customerId?: string,
  ) {
    return this.bookingsService.findAll(paginationDto, status, paymentStatus, customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.findById(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Update booking/payment status' })
  async updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateBookingStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.bookingsService.updateStatus(id, dto, userId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete booking (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingsService.remove(id);
  }
}
