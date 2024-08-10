import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { Action } from 'src/system/action/entities/action.entity'
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm'

export enum RoleRelations {
  Actions = 'actions'
}

@Entity('sys_role')
export class Role extends BaseEntity {
  @Column()
  name: string

  @Index()
  @Column({ unique: true })
  code: string

  @ManyToMany(() => Account, (_) => _.roles)
  @JoinTable({
    name: 'sys_account_role',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'accountId' }
  })
  accounts: Account[]

  @ManyToMany(() => Action, (_) => _.roles)
  @JoinTable({
    name: 'sys_role_action',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'actionId' }
  })
  actions: Action[]
}
