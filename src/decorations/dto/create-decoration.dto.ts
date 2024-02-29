import { IsNumber, IsString } from 'class-validator';

export class CreateDecorationDto {
  @IsString()
  name: string;

  @IsNumber()
  caterogyId: number;
} //this thing is creates a validator, that checks if fields are strings or numbers
