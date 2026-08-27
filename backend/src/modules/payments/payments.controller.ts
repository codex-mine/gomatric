import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { Role, PaymentStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Record payment transaction' })
  @ApiResponse({ status: 201, description: 'Payment recorded' })
  async create(@Body() createPaymentDto: CreatePaymentDto, @CurrentUser('id') userId: string) {
    return this.paymentsService.create(createPaymentDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated payments' })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'status', enum: PaymentStatus, required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('customerId') customerId?: string,
    @Query('status') status?: PaymentStatus,
  ) {
    return this.paymentsService.findAll(paginationDto, customerId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.paymentsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update payment record' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentsService.update(id, updatePaymentDto, userId);
  }
}
