import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../../shared/entities/base.entity'
import { Action } from '../../../system/actions/entities/action.entity'
import { Account } from 'src/system/accounts/entities/account.entity'

@Entity('system_role')
export class Role extends BaseEntity {
  @Column()
  name: string

  @ManyToMany(() => Account, (account) => account.roles)
  @JoinTable({
    name: 'system_account_role',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'userId' }
  })
  users: Account[]

  @ManyToMany(() => Action, (action) => action.roles)
  @JoinTable({
    name: 'system_role_action',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'actionId' }
  })
  actions: Action[]
}
