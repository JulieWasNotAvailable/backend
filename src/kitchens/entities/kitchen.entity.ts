import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  corpus_description: string; //material&colour

  @Column()
  facade_description: string; //material and colour

  @Column()
  length: number; //стринг формат потому что в макете указаны метры

  @Column({ nullable: true })
  old_price: number;

  @Column()
  new_price: number;
}
