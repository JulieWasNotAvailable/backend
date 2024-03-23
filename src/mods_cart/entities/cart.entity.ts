import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cart.item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  getTotalPrice() {
    if (this.cartItems == null) {
      return 0;
    }
    let sum = 0;
    this.cartItems.forEach((a) => (sum += a.mod.price));
    return sum;
  }
}
