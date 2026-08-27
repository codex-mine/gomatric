import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentItem, DocumentItemSchema } from './schemas/document.schema';
import { DocumentsRepository } from './documents.repository';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: DocumentItem.name, schema: DocumentItemSchema }])],
  controllers: [DocumentsController],
  providers: [DocumentsRepository, DocumentsService],
  exports: [DocumentsRepository, DocumentsService, MongooseModule],
})
export class DocumentsModule {}
