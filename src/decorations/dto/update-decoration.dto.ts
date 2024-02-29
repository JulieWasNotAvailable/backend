import { PartialType } from '@nestjs/swagger'; //all fields in createdecoration dto are set to optional
import { CreateDecorationDto } from './create-decoration.dto';

export class UpdateDecorationDto extends PartialType(CreateDecorationDto) {}
