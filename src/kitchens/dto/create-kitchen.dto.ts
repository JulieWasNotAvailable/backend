import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateKitchenDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  title: string;

  @IsString()
  kitchen_description: string;

  @IsNumber()
  corpus_description: number; //material&colour

  @IsNumber()
  facade_description: number; //material&colour

  @IsNumber()
  length: number;

  @IsNumber()
  old_price: number;

  @IsNumber()
  new_price: number;
}
