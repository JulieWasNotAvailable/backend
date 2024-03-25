import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ModsService } from './mods.service';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('mods')
@Controller('mods')
export class ModsController {
  constructor(private readonly modsService: ModsService) {}

  @Roles(['admin'])
  @Post()
  create(@Body() createModDto: CreateModDto) {
    return this.modsService.create(createModDto);
  }

  @Roles(['admin', 'user'])
  @Get()
  findAll() {
    return this.modsService.findAll();
  }

  @Roles(['admin', 'user'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modsService.findOne(+id);
  }

  @Roles(['admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModDto: UpdateModDto) {
    return this.modsService.update(+id, updateModDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modsService.remove(+id);
  }
}
