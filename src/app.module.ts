import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './configs/postgres.configs';
import { DecorationsModule } from './decorations/decorations.module';
import { KitchensModule } from './kitchens/kitchens.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ModsModule } from './mods/mods.module';
import { CartModule } from './mods_cart/mods_cart.module';
// import { HelpModule } from './help/help.module';

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
    DecorationsModule,
    KitchensModule,
    UsersModule,
    AuthModule,
    ModsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
