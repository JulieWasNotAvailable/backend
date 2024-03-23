import { Module } from '@nestjs/common';
import { CartService } from './mods_cart.service';
import { CartController } from './mods_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart.item.entity';
import { ModsModule } from 'src/mods/mods.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem, Cart]),
    ModsModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
