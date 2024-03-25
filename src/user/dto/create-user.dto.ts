import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ default: 'name1' })
  username: string;

  @IsString()
  @ApiProperty({ default: '123' })
  password: string;
}
