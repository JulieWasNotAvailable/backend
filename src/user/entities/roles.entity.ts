import { Column, Entity } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @Column()
  admin: string;

  @Column()
  user: string;
}
