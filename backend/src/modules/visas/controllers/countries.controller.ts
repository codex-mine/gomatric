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
import { CountriesService } from '../services/countries.service';
import {
  CountryFilterDto,
  CreateCountryDto,
  UpdateCountryDto,
} from '../dto/country.dto';
import { JwtAuthGuard, RolesGuard } from '../../../common/guards';
import { Public, Roles } from '../../../common/decorators';
import { Role } from '../../../common/constants/roles.enum';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Public()
  @Get('active')
  @ApiOperation({ summary: 'Get all active countries for dropdowns and navigation' })
  async getActive(@Query('isPopular') isPopular?: boolean) {
    return this.countriesService.findActive(isPopular);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get country details by URL slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.countriesService.findBySlug(slug);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new country (Admin & Manager)' })
  @ApiResponse({ status: 201, description: 'Country created successfully' })
  async create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of countries with filters' })
  async findAll(@Query() filterDto: CountryFilterDto) {
    return this.countriesService.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get country by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.countriesService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update country details (Admin & Manager)' })
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete country (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.countriesService.remove(id);
  }
}
