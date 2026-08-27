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
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Public, Roles } from '../../common/decorators';
import { Role } from '../../common/constants/roles.enum';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured destinations for homepage' })
  async getFeatured() {
    return this.destinationsService.findFeatured();
  }

  @Public()
  @Get('popular')
  @ApiOperation({ summary: 'Get popular destinations' })
  async getPopular() {
    return this.destinationsService.findPopular();
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get destination details by slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.destinationsService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new destination' })
  @ApiResponse({ status: 201, description: 'Destination created' })
  async create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get paginated destinations' })
  @ApiQuery({ name: 'popular', required: false, type: Boolean })
  async findAll(@Query() paginationDto: PaginationDto, @Query('popular') popular?: boolean) {
    return this.destinationsService.findAll(paginationDto, popular);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get destination by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.destinationsService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update destination' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete destination (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.destinationsService.remove(id);
  }
}
