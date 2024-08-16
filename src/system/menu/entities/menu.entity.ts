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
export enum TypeEnum {
  CATALOG = 'CATALOG',
  MENU = 'MENU',
  BUTTON = 'BUTTON'
}

@Entity('sys_menu')
export class Menu extends BaseEntity {
  @Column()
  name: string
  @Index()
  @Column({ unique: true })
  router: string
  @Column()
  icon: string
  @Column({ nullable: true, type: 'text' })
  path: string
  @Column({ nullable: true, name: 'parentId' })
  parentId: string | null
  @Column({ nullable: true })
  component: string | null
  @Column({ nullable: true })
  redirect: string | null
  @Column({
    type: 'enum',
    enum: TypeEnum,
    default: TypeEnum.CATALOG
  })
  type: TypeEnum

  @Column({
    type: 'int',
    default: 0
  })
  sort: number

  @ManyToOne(() => Menu, (menu) => menu.children)
  @JoinColumn({ name: 'parentId' })
  parent: Menu

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[]

  @OneToMany(() => Action, (action) => action.menu, { onDelete: 'CASCADE' })
  actions: Action[]
}
