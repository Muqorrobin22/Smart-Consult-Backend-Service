import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseModule } from './disease/disease.module';

@Module({
  imports: [DiseaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
