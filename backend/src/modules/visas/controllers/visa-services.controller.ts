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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VisaServicesService } from '../services/visa-services.service';
import {
  CreateVisaServiceDto,
  UpdateVisaServiceDto,
  VisaServiceFilterDto,
} from '../dto/visa-service.dto';
import { ApplicantType } from '../enums/visa-service.enum';
import { JwtAuthGuard, RolesGuard } from '../../../common/guards';
import { Public, Roles } from '../../../common/decorators';
import { Role } from '../../../common/constants/roles.enum';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';

@ApiTags('Visa Services')
@Controller('visa-services')
export class VisaServicesController {
  constructor(private readonly visaServicesService: VisaServicesService) {}

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured visa services for homepage and landing highlights' })
  async getFeatured() {
    return this.visaServicesService.findFeatured();
  }

  @Public()
  @Get('country/:countrySlug')
  @ApiOperation({ summary: 'Get all active visa services available for a country by slug' })
  async getByCountrySlug(@Param('countrySlug') countrySlug: string) {
    return this.visaServicesService.findByCountrySlug(countrySlug);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get comprehensive visa service details by URL slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.visaServicesService.findBySlug(slug);
  }

  @Public()
  @Get(':id/documents')
  @ApiOperation({ summary: 'Get tailored required documents for a specific applicant category' })
  @ApiQuery({
    name: 'applicantType',
    enum: ApplicantType,
    required: false,
    description: 'Applicant profile category (e.g. EMPLOYED, STUDENT, MINOR)',
  })
  async getApplicantDocuments(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('applicantType') applicantType?: ApplicantType,
  ) {
    return this.visaServicesService.getDocumentsForApplicant(id, applicantType);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new visa service (Admin & Manager)' })
  @ApiResponse({ status: 201, description: 'Visa service created successfully' })
  async create(@Body() createVisaServiceDto: CreateVisaServiceDto) {
    return this.visaServicesService.create(createVisaServiceDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated visa services with multi-criteria filters' })
  async findAll(@Query() filterDto: VisaServiceFilterDto) {
    return this.visaServicesService.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get visa service by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visaServicesService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update visa service details (Admin & Manager)' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateVisaServiceDto: UpdateVisaServiceDto,
  ) {
    return this.visaServicesService.update(id, updateVisaServiceDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete visa service (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visaServicesService.remove(id);
  }
}
