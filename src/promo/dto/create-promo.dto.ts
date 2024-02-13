/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePromoDto {
  @ApiProperty({ //декоратор, который добавляет кнопку загрузки файла, копируется с документации
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File; //всё, что касается работы с файлами , берём из двугих папок

  @IsString()
  title: string = 'Название акции'; //будет вставлено в сваггер

  @IsString()
  text: string = 'Описание акции';
}