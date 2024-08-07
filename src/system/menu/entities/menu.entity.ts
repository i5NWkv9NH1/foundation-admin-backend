import { BaseEntity } from 'src/shared/entities/base.entity'
import { Action } from 'src/system/action/entities/action.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('sys_menu')
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
  @Column({ nullable: true, type: 'text' })
  labelPath?: string
  @ManyToOne(() => Menu, (_) => _.children)
  parent: Menu
  @OneToMany(() => Menu, (_) => _.parent)
  children: Menu[]
  @OneToMany(() => Action, (_) => _.menu)
  actions: Action[]
}
