import { Module } from '@nestjs/common';
import { ModsService } from './mods.service';
import { ModsController } from './mods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModEntity } from './entities/mod.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ModEntity])],
  controllers: [ModsController],
  providers: [ModsService],
  exports: [ModsService],
})
export class ModsModule {}
