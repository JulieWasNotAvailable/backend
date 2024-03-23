import { PartialType } from '@nestjs/swagger';
import { AddModToCartDto } from './addModToCart.dto';

export class UpdateModToCartDto extends PartialType(AddModToCartDto) {}
