import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from 'src/mods_cart/entities/cart.item.entity';

@Entity('mod')
export class ModEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 900 })
  price: number;

  @Column({ default: '200x300x400мм' })
  size: string;

  // @OneToMany(() => CartItem, (cartItem) => cartItem.mod)
  // cartItem: CartItem;
}
