import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BotController],
  providers: [BotService, PrismaService],
})
export class BotModule {}
