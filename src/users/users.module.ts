import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersModule],
  controllers: [UsersController],
})
export class UsersModule {}
