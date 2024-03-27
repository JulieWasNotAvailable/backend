import {
  Controller,
  Get,
  UseGuards,
  Param,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['admin', 'user'])
  @Get('me')
  findById(@UserId() id: number) {
    return this.usersService.findById(id);
  }

  @Roles(['admin'])
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Patch('changePass')
  update(@UserId() id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updatePass(id, dto);
  }

  @Roles(['admin'])
  @Delete(':userId')
  removeById(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }

  @Roles(['admin', 'user'])
  @Delete('me')
  removeOne(@UserId() id: number) {
    return this.usersService.delete(id);
  }
}
