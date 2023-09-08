import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.role)
  menus: Menu[];
}
