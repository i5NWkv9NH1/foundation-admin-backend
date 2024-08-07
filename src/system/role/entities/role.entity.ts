import { BaseEntity } from 'src/shared/entities/base.entity'
import { Account } from 'src/system/account/entities/account.entity'
import { Action } from 'src/system/action/entities/action.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'

export enum RoleRelations {
  Actions = 'actions'
}

@Entity('sys_role')
export class Role extends BaseEntity {
  @Column()
  name: string

  @ManyToMany(() => Account, (_) => _.roles)
  @JoinTable({
    name: 'sys_account_role',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'account_id' }
  })
  accounts: Account[]

  @ManyToMany(() => Action, (_) => _.roles)
  @JoinTable({
    name: 'sys_role_action',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'action_id' }
  })
  actions: Action[]
}
