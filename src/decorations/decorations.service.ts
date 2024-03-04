import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { DecorationEntity } from './entities/decoration.entity';
import * as fs from 'fs';

import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DecorationService {
  constructor(
    @InjectRepository(DecorationEntity)
    private repository: Repository<DecorationEntity>,
  ) {}

  async create(
    dto: CreateDecorationDto,
    image: Express.Multer.File,
  ): Promise<DecorationEntity> {
    return this.repository.save({
      colour: dto.colour,
      material: dto.material,
      description: dto.description,
      image: image.filename,
    });
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateDecorationDto,
    image: Express.Multer.File,
  ) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.colour) {
      toUpdate.colour = dto.colour;
    }
    if (dto.material) {
      toUpdate.material = dto.material;
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/promo/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err); //тут надо будет прописать нормальную работу ошибок
          }
        });
      }
      toUpdate.image = image.filename;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
