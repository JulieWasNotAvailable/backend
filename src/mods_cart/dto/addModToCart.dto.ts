import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddModToCartDto {
  @ApiProperty()
  @IsNotEmpty()
  modId: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}
