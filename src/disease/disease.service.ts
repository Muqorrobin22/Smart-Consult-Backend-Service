import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiseaseService {
  constructor(private prisma: PrismaService) {}

  async symptomsDisease(userWhereUniqueInput: string) {
    return this.prisma
      .$queryRaw`select * from forward_chaining(${userWhereUniqueInput});`;
  }
}
