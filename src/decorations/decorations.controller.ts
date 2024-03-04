import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DecorationService } from './decorations.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { DecorationEntity } from './entities/decoration.entity';

@ApiTags('decorations')
@Controller('decorations')
export class DecorationsController {
  constructor(private readonly decorationsService: DecorationService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateDecorationDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<DecorationEntity> {
    return this.decorationsService.create(dto, image);
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDecorationDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<DecorationEntity> {
    return this.decorationsService.update(+id, dto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.decorationsService.delete(+id);
  }
}
