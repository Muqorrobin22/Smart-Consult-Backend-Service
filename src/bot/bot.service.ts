import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}

  async getBotResponse(userWhereUniqueInput: string) {
    return this.prisma
      .$queryRaw`select * from output_bot(${userWhereUniqueInput});`;
  }
}
