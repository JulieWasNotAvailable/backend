import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }
    return this.repository.save({
      username: dto.username,
      password: dto.password,
    });
  }

  async updatePass(userId: number, dto: UpdateUserDto) {
    const userToUpdate = await this.repository.findOneBy({ userId });
    if (!userToUpdate) {
      throw new BadRequestException(`Запись с id=${userId} не найдена`);
    }
    if (userToUpdate.password !== dto.oldpass) {
      throw new BadRequestException('Пароли не совпадают');
    }
    if (dto.password) {
      userToUpdate.password = dto.password;
    }
    this.repository.save(userToUpdate);
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(userId: number) {
    return this.repository.findOneBy({ userId });
  }

  async delete(userId: number) {
    return this.repository.delete(userId);
  }
}
