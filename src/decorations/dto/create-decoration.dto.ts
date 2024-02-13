import { IsString } from 'class-validator';

export class CreateDecorationDto {
  @IsString()
  name: string;
}
