import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VisasService } from './visas.service';
import {
  CreateVisaApplicationDto,
  UpdateVisaApplicationDto,
  UpdateVisaStatusDto,
} from './dto/visa-application.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Public, Roles } from '../../common/decorators';
import { Role, VisaApplicationStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Visa Applications')
@Controller('visas')
export class VisasController {
  constructor(private readonly visasService: VisasService) {}

  @Public()
  @Get('track/:applicationNumber')
  @ApiOperation({ summary: 'Public application tracking by application number' })
  async trackApplication(@Param('applicationNumber') applicationNumber: string) {
    return this.visasService.findByApplicationNumber(applicationNumber);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Submit a new visa application' })
  @ApiResponse({ status: 201, description: 'Visa application submitted' })
  async create(@Body() createVisaDto: CreateVisaApplicationDto, @CurrentUser('id') userId: string) {
    return this.visasService.create(createVisaDto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get paginated visa applications' })
  @ApiQuery({ name: 'status', enum: VisaApplicationStatus, required: false })
  @ApiQuery({ name: 'customerId', required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: VisaApplicationStatus,
    @Query('customerId') customerId?: string,
  ) {
    return this.visasService.findAll(paginationDto, status, customerId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get visa application details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visasService.findById(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Update visa application status' })
  async updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateVisaStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.visasService.updateStatus(id, dto, userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Update visa application details' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateVisaDto: UpdateVisaApplicationDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.visasService.update(id, updateVisaDto, userId);
  }
}
