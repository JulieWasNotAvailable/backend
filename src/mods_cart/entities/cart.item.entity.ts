import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModEntity } from 'src/mods/entities/mod.entity';
import { Cart } from './cart.entity';
import { KitchenEntity } from 'src/kitchens/entities/kitchen.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  kitchenId: number;

  @ManyToOne(() => KitchenEntity, (kitchen) => kitchen.cartItem)
  @JoinColumn({ name: 'kitchenId' })
  kitchen: KitchenEntity;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  // @JoinColumn({ name: 'cartId' })
  cart: Cart;
}
