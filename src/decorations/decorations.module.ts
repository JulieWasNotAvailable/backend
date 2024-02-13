import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DecorationService } from './decorations.service';
import { DecorationsController } from './decorations.controller';
import { DecorationEntity } from './entities/decoration.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DecorationEntity])],
  controllers: [DecorationsController],
  providers: [DecorationService],
})
export class DecorationsModule {}
