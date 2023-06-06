import { admin_temp } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AdminEntity implements admin_temp {
  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }

  id: number;

  username: string;

  @Exclude()
  password: string;

  email: string;
}
