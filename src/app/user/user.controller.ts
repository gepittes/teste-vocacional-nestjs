import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Return user by id' })
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }
}
