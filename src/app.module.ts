import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseModule } from './disease/disease.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [DiseaseModule, BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
