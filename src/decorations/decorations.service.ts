import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { DecorationEntity } from './entities/decoration.entity';

import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DecorationService {
  constructor(
    @InjectRepository(DecorationEntity)
    private repository: Repository<DecorationEntity>,
  ) {}

  async create(dto: CreateDecorationDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDecorationDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
