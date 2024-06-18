import { Module } from '@nestjs/common';
import { ModsService } from './mods.service';
import { ModsController } from './mods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModEntity } from './entities/mod.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ModEntity]), HttpModule],
  controllers: [ModsController],
  providers: [ModsService],
  exports: [ModsService],
})
export class ModsModule {}
