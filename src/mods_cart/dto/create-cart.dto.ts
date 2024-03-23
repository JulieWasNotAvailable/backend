import { IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  totalPrice: number;
}
