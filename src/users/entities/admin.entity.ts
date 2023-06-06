import { admin_temp } from '@prisma/client';

export class AdminEntity implements admin_temp {
  id: number;

  username: string;

  password: string;

  email: string;
}
