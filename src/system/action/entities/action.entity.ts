import { BaseEntity } from 'src/shared/entities/base.entity'
import { Menu } from 'src/system/menu/entities/menu.entity'
import { Role } from 'src/system/role/entities/role.entity'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'

@Entity('sys_action')
export class Action extends BaseEntity {
  @Column()
  name: string
  @Column()
  code: string
  @Column()
  icon: string
  @Column('uuid', { name: 'menu_id' })
  menuId: string
  @ManyToOne(() => Menu, (_) => _.actions)
  menu: Menu
  @ManyToMany(() => Role, (_) => _.actions)
  roles: Role[]
}
