import { BaseEntity } from 'src/shared/entities/base.entity'
import { Action } from 'src/system/action/entities/action.entity'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

export enum MenuRelations {
  Actions = 'actions'
}

@Entity('sys_menu')
export class Menu extends BaseEntity {
  @Column()
  label: string

  @Index()
  @Column({ unique: true })
  router: string

  @Column()
  icon: string

  @Column({ nullable: true, type: 'text' })
  path?: string
  @Column({ nullable: true, name: 'parent_id' })
  parentId?: string

  @ManyToOne(() => Menu, (menu) => menu.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[]

  @OneToMany(() => Action, (action) => action.menu)
  actions: Action[]
}
