import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('decoration')
export class DecorationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.decoration, {
    eager: true,
  })
  @JoinColumn() //id подставится автоматом
  category: CategoryEntity;
}
