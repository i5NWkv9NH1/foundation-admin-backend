import { BaseEntity } from 'src/shared/entities/base.entity'
import { Menu } from 'src/system/menu/entities/menu.entity'
import { Role } from 'src/system/role/entities/role.entity'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'

@Entity('sys_action')
export class Action extends BaseEntity {
  @Column()
  name: string

  @Column()
  code: string

  @Column()
  icon: string

  @Column('uuid', { name: 'menuId' })
  menuId: string

  @ManyToOne(() => Menu, (_) => _.actions, { onDelete: 'CASCADE' })
  // TODO: find menu by id load relation
  @JoinColumn({ name: 'menuId' })
  menu: Menu

  @ManyToMany(() => Role, (_) => _.actions)
  roles: Role[]
}
