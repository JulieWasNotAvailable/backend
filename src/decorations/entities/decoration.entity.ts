import { KitchenEntity } from 'src/kitchens/entities/kitchen.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('decoration')
export class DecorationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column() //name of the item
  colour: string;

  @Column()
  material: string; //дсп, лспд, эмаль и тд

  @Column()
  description: string;

  @OneToMany(() => KitchenEntity, (kitchen) => kitchen.decoration)
  @JoinColumn()
  kitchen: KitchenEntity[];

  @OneToMany(() => KitchenEntity, (kitchen) => kitchen.decoration)
  @JoinColumn()
  kitchen_2: KitchenEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;
}
