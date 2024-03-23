import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';
// import { UserId } from '../decorators/user-id.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  findById(@Param('userId') id: number) { //getme
    return this.usersService.findById(id);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
