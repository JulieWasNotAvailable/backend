import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  create(@Body() createPromoDto: CreatePromoDto) {
    return this.promoService.create(createPromoDto);
  }

  @Get()
  findAll() {
    return this.promoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promoService.update(+id, updatePromoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.remove(+id);
  }
}
