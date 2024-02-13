import { IsNumber, IsString } from 'class-validator';

export class CreateDecorationDto {
  @IsString()
  name: string;

  @IsNumber()
  caterogyId: number;
}
