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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentVerificationDto } from './dto/document.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { Role, DocumentType, VerificationStatus } from '../../common/constants';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Register/upload a document record' })
  @ApiResponse({ status: 201, description: 'Document record created' })
  async create(@Body() createDocumentDto: CreateDocumentDto, @CurrentUser('id') userId: string) {
    return this.documentsService.create(createDocumentDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get paginated documents' })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'documentType', enum: DocumentType, required: false })
  @ApiQuery({ name: 'verificationStatus', enum: VerificationStatus, required: false })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('customerId') customerId?: string,
    @Query('documentType') documentType?: DocumentType,
    @Query('verificationStatus') verificationStatus?: VerificationStatus,
  ) {
    return this.documentsService.findAll(
      paginationDto,
      customerId,
      documentType,
      verificationStatus,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document details by ID' })
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.documentsService.findById(id);
  }

  @Patch(':id/verify')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.AGENT)
  @ApiOperation({ summary: 'Verify or reject a document (Staff only)' })
  async updateVerification(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateDocumentVerificationDto,
    @CurrentUser('id') verifierId: string,
  ) {
    return this.documentsService.updateVerification(id, dto, verifierId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete document record (Admin only)' })
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.documentsService.remove(id);
  }
}
