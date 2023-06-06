import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const findUser = await this.userService.findOne(username);

    if (findUser && findUser.password === password) {
      return findUser;
    }

    throw new UnauthorizedException();
  }
}
