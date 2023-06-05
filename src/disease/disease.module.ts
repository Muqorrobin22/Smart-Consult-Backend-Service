import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiseaseController],
  providers: [DiseaseService, PrismaService],
})
export class DiseaseModule {}
