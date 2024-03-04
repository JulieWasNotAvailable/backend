import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DecorationEntity } from 'src/decorations/entities/decoration.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // @ApiHideProperty()
  // @OneToMany(() => DecorationEntity, (decoration) => decoration.category)
  // products: DecorationEntity[];
  // decoration: any;
}
