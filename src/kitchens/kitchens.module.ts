import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { KitchensService } from './kitchens.service';
import { KitchensController } from './kitchens.controller';
import { KitchenEntity } from './entities/kitchen.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([KitchenEntity])],
  controllers: [KitchensController],
  providers: [KitchensService],
  exports: [KitchensService],
})
export class KitchensModule {}
