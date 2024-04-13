import { DecorationEntity } from 'src/decorations/entities/decoration.entity';
import { CartItem } from 'src/mods_cart/entities/cart.item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('kitchen')
export class KitchenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  kitchen_description: string;

  @Column()
  corpus_description: number; //material&colour

  @Column()
  facade_description: number; //material and colour

  @Column()
  length: number; //стринг формат потому что в макете указаны метры

  @Column()
  old_price: number;

  @Column()
  new_price: number;

  @ManyToOne(() => DecorationEntity, (decoration) => decoration.kitchen, {
    eager: true,
  })
  @JoinColumn({ name: 'corpus_description' })
  decoration: DecorationEntity;

  @ManyToOne(() => DecorationEntity, (decoration) => decoration.kitchen, {
    eager: true,
  })
  @JoinColumn({ name: 'facade_description' })
  decoration_2: DecorationEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.kitchen)
  cartItem: CartItem;
}
