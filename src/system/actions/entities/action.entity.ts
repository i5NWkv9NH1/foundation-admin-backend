import { Role } from 'src/system/roles/entities/role.entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { Menu } from '../../menus/entities/menu.entity'

@Entity('system_action')
export class Action extends BaseEntity {
  @Column()
  name: string

  @Column()
  code: string

  @Column()
  icon: string

  @Column()
  menuId: string

  @ManyToOne(() => Menu, (menu) => menu.actions, { onDelete: 'CASCADE' })
  menu: Menu

  @ManyToMany(() => Role, (role) => role.actions)
  roles: Role[]
}
