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
  UseGuards,
} from '@nestjs/common';
import { DecorationService } from './decorations.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { UpdateDecorationDto } from './dto/update-decoration.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { DecorationEntity } from './entities/decoration.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('decorations')
@Controller('decorations')
export class DecorationsController {
  constructor(private readonly decorationsService: DecorationService) {}

  @Roles(['admin'])
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

  @Roles(['admin'])
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

  @Roles(['admin'])
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.decorationsService.delete(+id);
  }
}
