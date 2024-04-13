import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ModEntity } from './entities/mod.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModsService {
  constructor(
    @InjectRepository(ModEntity)
    private repository: Repository<ModEntity>,
  ) {}

  async create(dto: CreateModDto): Promise<ModEntity> {
    return this.repository.save({
      price: dto.price,
      size: dto.size,
    });
  }

  async findAll() {
    return this.repository.find;
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateModDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.price) {
      toUpdate.price = dto.price;
    }
    if (dto.price) {
      toUpdate.price = dto.price;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete({ id });
  }
}
