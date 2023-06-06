import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Fetch User with a given email
    const user = await this.prisma.admin_temp.findUnique({
      where: { email: email },
    });

    //  If No user Found
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Check if the password is correct
    const isPasswordValid = user.password === password;

    // if password not match
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Generate JWT containing user id
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  //   Not using this.
  //   async validateUser(username: string, password: string) {
  //     const findUser = await this.userService.findOne(username);

  //     if (findUser && findUser.password === password) {
  //       return findUser;
  //     }

  //     throw new UnauthorizedException();
  //   }
}
