import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DecorationService } from './decorations.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('decorations')
@Controller('decorations')
export class DecorationsController {
  constructor(private readonly decorationsService: DecorationService) {}

  @Post()
  create(@Body() createDecorationDto: CreateDecorationDto) {
    return this.decorationsService.create(createDecorationDto);
  }

  @Get()
  findAll() {
    return this.decorationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decorationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDecorationDto: UpdateDecorationDto,
  ) {
    return this.decorationsService.update(+id, updateDecorationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.decorationsService.delete(+id);
  }
}
