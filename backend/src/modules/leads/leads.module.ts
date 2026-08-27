import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from './schemas/lead.schema';
import { LeadsRepository } from './leads.repository';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }])],
  controllers: [LeadsController],
  providers: [LeadsRepository, LeadsService],
  exports: [LeadsRepository, LeadsService, MongooseModule],
})
export class LeadsModule {}
