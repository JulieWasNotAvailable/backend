import { IsNumber, IsString } from 'class-validator';

export class CreateModDto {
  @IsNumber()
  price: number;

  @IsString()
  size: string;
}
