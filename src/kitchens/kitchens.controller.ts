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
import { KitchensService } from './kitchens.service';
import { CreateKitchenDto } from './dto/create-kitchen.dto';
import { UpdateKitchenDto } from './dto/update-kitchen.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { KitchenEntity } from './entities/kitchen.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('kitchens')
@Controller('kitchens')
export class KitchensController {
  constructor(private readonly kitchensService: KitchensService) {}

  @Roles(['admin'])
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage })) //"file interceptor" gets the image from "image" field and sends it to a custom file storage
  create(
    @Body() dto: CreateKitchenDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<KitchenEntity> {
    return this.kitchensService.create(dto, image);
  }

  @Roles(['admin', 'user'])
  @Get()
  findAll() {
    return this.kitchensService.findAll();
  }

  @Roles(['admin', 'user'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kitchensService.findOne(+id);
  }

  @Roles(['admin'])
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateKitchenDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<KitchenEntity> {
    return this.kitchensService.update(+id, dto, image);
  }

  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kitchensService.remove(+id);
  }
}
