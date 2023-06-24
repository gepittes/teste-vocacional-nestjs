import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(userId: string) {
    return `User ${userId}`;
  }
}
