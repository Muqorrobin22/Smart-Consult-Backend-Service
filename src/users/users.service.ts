import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // async findOne(userWhereUniqueInput: string) {
  //   return this.prisma.admin_temp.findUnique({
  //     where: {
  //       username: userWhereUniqueInput,
  //     },
  //   });
  // }
}
