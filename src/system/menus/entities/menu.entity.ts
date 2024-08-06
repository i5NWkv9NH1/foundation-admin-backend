import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { Action } from '../../actions/entities/action.entity'

@Entity('system_menu')
export class Menu extends BaseEntity {
  @Column()
  label: string

  @Column()
  router: string

  @Column()
  icon: string

  @Column({ nullable: true })
  parentId?: string

  @Column({ nullable: true, type: 'text' })
  path?: string

  @ManyToOne(() => Menu, (menu) => menu.children)
  parent: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[]

  @OneToMany(() => Action, (action) => action.menu)
  actions: Action[]
}
