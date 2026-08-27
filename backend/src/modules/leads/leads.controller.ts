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
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto } from './dto/lead.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Public, Roles } from '../../common/decorators';
import { Role, LeadStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Leads & Inquiries')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Public()
  @Post('inquiry')
  @ApiOperation({ summary: 'Public inquiry submission from website forms' })
  @ApiResponse({ status: 201, description: 'Inquiry submitted successfully' })
  async createInquiry(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Create lead manually (Staff only)' })
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Get paginated leads' })
  @ApiQuery({ name: 'status', enum: LeadStatus, required: false })
  @ApiQuery({ name: 'assignedAgent', required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: LeadStatus,
    @Query('assignedAgent') assignedAgent?: string,
  ) {
    return this.leadsService.findAll(paginationDto, status, assignedAgent);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Get lead details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.leadsService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Update lead (status, priority, assigned agent, notes)' })
  async update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete lead (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.leadsService.remove(id);
  }
}
