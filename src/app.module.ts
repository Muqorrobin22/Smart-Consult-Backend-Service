import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseModule } from './disease/disease.module';
import { BotModule } from './bot/bot.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DiseaseService } from './disease/disease.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [DiseaseModule, BotModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, DiseaseService, PrismaService],
})
export class AppModule {}
