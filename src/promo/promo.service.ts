import { Injectable } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';

@Injectable()
export class PromoService {
  create(createPromoDto: CreatePromoDto) {
    return 'This action adds a new promo';
  }

  findAll() {
    return `This action returns all promo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promo`;
  }

  update(id: number, updatePromoDto: UpdatePromoDto) {
    return `This action updates a #${id} promo`;
  }

  remove(id: number) {
    return `This action removes a #${id} promo`;
  }
}
