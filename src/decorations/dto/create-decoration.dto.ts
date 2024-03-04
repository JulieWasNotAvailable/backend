import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDecorationDto {
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
  colour: string;

  @IsString()
  material: string; //здесь нужно сделать ограниченное число доступных элементов

  @IsString()
  description: string; //странные символы в стринге

  // @IsNumber()
  // caterogyId: number;
}
