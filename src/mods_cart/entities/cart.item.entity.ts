import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModEntity } from 'src/mods/entities/mod.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Quantity: number;

  @OneToOne(() => ModEntity, (module) => module.cartItem)
  @JoinColumn()
  mod: ModEntity;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
