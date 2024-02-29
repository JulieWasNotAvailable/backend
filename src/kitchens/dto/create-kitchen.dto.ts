import { IsNumber, IsString } from 'class-validator';

export class CreateKitchenDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  corpus_description: string; //material&colour

  @IsString()
  facade_description: string; //material&colour

  @IsNumber()
  length: number;

  @IsString()
  kitchen_description: string;

  @IsNumber()
  old_price: number;

  @IsNumber()
  new_price: number;
}
