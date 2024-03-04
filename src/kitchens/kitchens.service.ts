import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KitchenEntity } from './entities/kitchen.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class KitchensService {
  constructor(
    @InjectRepository(KitchenEntity)
    private repository: Repository<KitchenEntity>
  ) {}

  async create(
    dto: CreateKitchenDto,
    image: Express.Multer.File,
  ): Promise<KitchenEntity> {
    return this.repository.save({
      image: image.filename,
      title: dto.title,
      kitchen_description: dto.kitchen_description,
      corpus_description: dto.corpus_description,
      facade_description: dto.facade_description,
      length: dto.length,
      old_price: dto.old_price,
      new_price: dto.new_price,
    });
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateKitchenDto, image: Express.Multer.File) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.title) {
      toUpdate.title = dto.title; //если пользователь тыкает на изменить title field, данные направляются сюда
    }
    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/kitchen/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err); //тут надо будет прописать нормальную работу ошибок
          }
        });
      }
      toUpdate.image = image.filename;
    }
    if (dto.kitchen_description) {
      toUpdate.kitchen_description = dto.kitchen_description;
    }
    if (dto.corpus_description) {
      toUpdate.corpus_description = dto.corpus_description;
    }
    if (dto.facade_description) {
      toUpdate.facade_description = dto.facade_description;
    }
    if (dto.length) {
      toUpdate.length = dto.length;
    }
    if (dto.new_price) {
      toUpdate.new_price = dto.new_price;
    }
    if (dto.old_price) {
      toUpdate.old_price = dto.old_price;
    }
    return this.repository.save(toUpdate);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
