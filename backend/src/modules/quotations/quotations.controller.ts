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
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto, UpdateQuotationStatusDto } from './dto/quotation.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { Role, QuotationStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Quotations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Create quotation for lead/customer' })
  @ApiResponse({ status: 201, description: 'Quotation created' })
  async create(@Body() createQuotationDto: CreateQuotationDto, @CurrentUser('id') userId: string) {
    return this.quotationsService.create(createQuotationDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated quotations' })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'status', enum: QuotationStatus, required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('customerId') customerId?: string,
    @Query('status') status?: QuotationStatus,
  ) {
    return this.quotationsService.findAll(paginationDto, customerId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quotation details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.quotationsService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update quotation status (accept/reject/expire)' })
  async updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateQuotationStatusDto,
  ) {
    return this.quotationsService.updateStatus(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete quotation (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.quotationsService.remove(id);
  }
}
