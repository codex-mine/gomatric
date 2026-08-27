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
import { ToursService } from './tours.service';
import { CreateTourPackageDto, UpdateTourPackageDto } from './dto/tour-package.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Public, Roles } from '../../common/decorators';
import { Role } from '../../common/constants/roles.enum';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Tour Packages')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured tour packages for homepage' })
  async getFeatured() {
    return this.toursService.findFeatured();
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get tour package details by slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.toursService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new tour package' })
  @ApiResponse({ status: 201, description: 'Tour package created' })
  async create(@Body() createTourDto: CreateTourPackageDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get paginated tour packages' })
  @ApiQuery({ name: 'destinationId', required: false })
  @ApiQuery({ name: 'isFeatured', required: false, type: Boolean })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('destinationId') destinationId?: string,
    @Query('isFeatured') isFeatured?: boolean,
  ) {
    return this.toursService.findAll(paginationDto, destinationId, isFeatured);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get tour package by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.toursService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update tour package' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateTourDto: UpdateTourPackageDto,
  ) {
    return this.toursService.update(id, updateTourDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete tour package (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.toursService.remove(id);
  }
}
