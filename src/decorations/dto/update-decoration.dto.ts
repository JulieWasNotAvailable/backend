import { PartialType } from '@nestjs/swagger';
import { CreateDecorationDto } from './create-decoration.dto';

export class UpdateDecorationDto extends PartialType(CreateDecorationDto) {}
