import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { getPostgresConfig } from './configs/postgres.configs';
import { PromoModule } from './promo/promo.module';
import { DecorationsModule } from './decorations/decorations.module';
import { KitchensModule } from './kitchens/kitchens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    CategoryModule,
    PromoModule,
    DecorationsModule,
    KitchensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
