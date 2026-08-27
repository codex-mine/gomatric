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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VisaTypesService } from '../services/visa-types.service';
import {
  CreateVisaTypeDto,
  UpdateVisaTypeDto,
  VisaTypeFilterDto,
} from '../dto/visa-type.dto';
import { JwtAuthGuard, RolesGuard } from '../../../common/guards';
import { Public, Roles } from '../../../common/decorators';
import { Role } from '../../../common/constants/roles.enum';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';

@ApiTags('Visa Types')
@Controller('visa-types')
export class VisaTypesController {
  constructor(private readonly visaTypesService: VisaTypesService) {}

  @Public()
  @Get('active')
  @ApiOperation({ summary: 'Get all active visa types for forms and filters' })
  async getActive() {
    return this.visaTypesService.findActive();
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get visa type by URL slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.visaTypesService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new visa type (Admin & Manager)' })
  @ApiResponse({ status: 201, description: 'Visa type created successfully' })
  async create(@Body() createVisaTypeDto: CreateVisaTypeDto) {
    return this.visaTypesService.create(createVisaTypeDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of visa types with category filters' })
  async findAll(@Query() filterDto: VisaTypeFilterDto) {
    return this.visaTypesService.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get visa type by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visaTypesService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update visa type (Admin & Manager)' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateVisaTypeDto: UpdateVisaTypeDto,
  ) {
    return this.visaTypesService.update(id, updateVisaTypeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete visa type (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.visaTypesService.remove(id);
  }
}
